import Mux from "@mux/mux-node";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

import { db } from "@/lib/db";
import { isTeacher } from "@/lib/teacher";

const { Video } = new Mux(
  process.env.MUX_TOKEN_ID!,
  process.env.MUX_TOKEN_SECRET!
);

export async function DELETE(
  req: Request,
  context: { params: Promise<{ courseId: string; chapterId: string }> } 
) {
  try {
    const { userId } = auth();

    if (!userId || !isTeacher(userId)) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const { courseId, chapterId } = await context.params; // Await the params

    const ownCourse = await db.course.findUnique({
      where: {
        id: courseId,
        userId,
      },
    });

    if (!ownCourse) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const chapter = await db.chapter.findUnique({
      where: {
        id: chapterId,
        courseId: courseId,
      },
    });

    if (!chapter) {
      return new NextResponse("Not Found", { status: 404 });
    }

    if (chapter.videoUrl) {
      const existingMuxData = await db.muxData.findFirst({
        where: {
          chapterId: chapterId,
        },
      });

      if (existingMuxData) {
        await Video.Assets.del(existingMuxData.assetId);
        await db.muxData.delete({
          where: {
            id: existingMuxData.id,
          },
        });
      }
    }

    const deletedChapter = await db.chapter.delete({
      where: {
        id: chapterId,
      },
    });

    const publishedChaptersInCourse = await db.chapter.findMany({
      where: {
        courseId: courseId,
        isPublished: true,
      },
    });

    if (!publishedChaptersInCourse.length) {
      await db.course.update({
        where: {
          id: courseId,
        },
        data: {
          isPublished: false,
        },
      });
    }

    return NextResponse.json(deletedChapter);
  } catch (error) {
    console.log("[CHAPTER_ID_DELETE]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}


export async function PATCH(
  req: Request,
  context: { params: Promise<{ courseId: string; chapterId: string }> } // Adjusted type for params
) {
  try {
    const { userId } = auth();
    const { isPublished, ...values } = await req.json();

    if (!userId || !isTeacher(userId)) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const { courseId, chapterId } = await context.params; // Await the params

    const ownCourse = await db.course.findUnique({
      where: {
        id: courseId,
        userId,
      },
    });

    if (!ownCourse) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const chapter = await db.chapter.update({
      where: {
        id: chapterId,
        courseId: courseId,
      },
      data: {
        ...values,
      },
    });

    if (values.videoUrl) {
      const existingMuxData = await db.muxData.findFirst({
        where: {
          chapterId: chapterId,
        },
      });

      if (existingMuxData) {
        try {
          await Video.Assets.del(existingMuxData.assetId);
        } catch (error) {
          console.log("[Mux Asset Delete]", error);
        }
        await db.muxData.delete({
          where: {
            id: existingMuxData.id,
          },
        });
      }

      try {
        const asset = await Video.Assets.create({
          input: values.videoUrl,
          playback_policy: "public",
          test: false,
        });

        if (asset) {
          await db.muxData.create({
            data: {
              chapterId: chapterId,
              assetId: asset.id,
              playbackId: asset.playback_ids?.[0]?.id,
            },
          });
        }
      } catch (error) {
        console.log("[Mux Asset Create]", error);
      }
    }

    return NextResponse.json(chapter);
  } catch (error) {
    console.log("[COURSES_CHAPTER_ID]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}


