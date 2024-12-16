import { db } from "@/lib/db";
import { isTeacher } from "@/lib/teacher";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

export async function POST(
  req: Request,
  context: { params: Promise<{ chapterId: string, courseId:string }> } // Adjusted type for params
) {
  try {
    const { userId } = auth();
    const { url, originalFilename } = await req.json();

    const { chapterId, courseId } = await context.params; // Await the params

    console.log("CHAPTER_ID_ATTACHMENTS", url, chapterId);

    if (!userId || !isTeacher(userId)) {
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
        courseId:courseId,
        chapterId: chapterId,
      },
    });

    return NextResponse.json(attachment);
  } catch (error) {
    console.log("CHAPTER_ID_ATTACHMENTS", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}


export async function GET(req: Request, { params }: { params: Promise<{ courseId: string, chapterId: string }>}) {
  try {
    const chapterId  = ( await params).chapterId
    const attachments = await db.attachment.findMany({
      where: { chapterId },
      orderBy: { createdAt: "desc" },
    });
    return NextResponse.json(attachments);
  } catch (error) {
    console.error("Error fetching attachments:", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}