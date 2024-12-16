import { db } from "@/lib/db";
import { isTeacher } from "@/lib/teacher";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

export async function POST(
  req: Request,
  context: { params: Promise<{ courseId: string }> } // Adjusted type for params
) {
  try {
    const { userId } = auth();
    const { url, originalFilename } = await req.json();

    const { courseId } = await context.params; // Await the params

    console.log("COURSE_ID_ATTACHMENTS", url, courseId);

    if (!userId || !isTeacher(userId)) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const courseOwner = await db.course.findUnique({
      where: {
        id: courseId,
        userId: userId,
      },
    });

    if (!courseOwner) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    let name = url ? url.split("/").pop() || "Untitled" : "Untitled";
    if (originalFilename) {
      name = originalFilename;
    }

    const attachment = await db.attachment.create({
      data: {
        url,
        name,
        courseId: courseId,
      },
    });

    return NextResponse.json(attachment);
  } catch (error) {
    console.log("COURSE_ID_ATTACHMENTS", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
