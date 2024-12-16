import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

import { db } from "@/lib/db";
import { isTeacher } from "@/lib/teacher";

export async function DELETE(
  req: Request,
  context: { params: Promise<{ courseId: string; attachmentId: string, chapterId: string }> } // Adjusted type
) {
  try {
    const { userId } = auth();

    if (!userId || !isTeacher(userId)) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const { courseId, attachmentId, chapterId } = await context.params; // Await the params

    const attachment = await db.attachment.delete({
      where: {
        courseId: courseId,
        chapterId: chapterId,
        id: attachmentId,
      },
    });

    return NextResponse.json(attachment);
  } catch (error) {
    console.log("ATTACHMENT_ID", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
