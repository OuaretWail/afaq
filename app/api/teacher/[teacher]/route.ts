import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

import { isTeacher } from "@/lib/teacher";


export async function DELETE(
  req: Request,
  { params }: { params: Promise<{ teacher: string }> } // Adjusted for Promise
) {
  try {
    const { userId } = auth();

    if (!userId || !isTeacher(userId)) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const { teacher } = await params; // Await the params

    const teacher_info = await db.teacher.findUnique({
      where: {
        id: teacher,
      },
    });

    if (!teacher_info) {
      return new NextResponse("Not found", { status: 401 });
    }

    // Delete the course
    const deletedTeacher = await db.teacher.delete({
      where: {
        id: teacher,
        userId,      },
    });

    return NextResponse.json(deletedTeacher);
  } catch (error) {
    console.log("[TEACHER_ID_DELETE]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}

export async function PATCH(
  req: Request,
  { params }: { params: Promise<{ teacher: string }> } // Adjusted for Promise
) {
  try {
    const { userId } = auth();
    const { teacher } = await params; // Await the params
    const values = await req.json();

    if (!userId || !isTeacher(userId)) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const teacherInfo = await db.teacher.update({
      where: {
        id: teacher,
        userId,
      },
      data: {
        ...values,
      },
    });

    return NextResponse.json(teacherInfo);
  } catch (error) {
    console.log("[COURSE_ID]", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
