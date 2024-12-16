import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { userId } = auth();
    const { name } = await req.json();

    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const teacher = await db.teacher.create({
      data: { userId, name },
    });

    // Debugging teacher creation
    console.log("Created Teacher:", teacher);

    return NextResponse.json({ id: teacher.id });
  } catch (error) {
    console.error("Error creating teacher:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}





export async function GET(req: Request) {
  try {
      // Fetch courses that are published and visible
      const teachers = await db.teacher.findMany({
        include:{
          category: { select: { name: true } }, 
        }
      });

      return NextResponse.json(teachers);
  } catch (error) {
      console.log("[GET /api/teacher] Error:", error);
      return new NextResponse("Internal Server Error", { status: 500 });
  }
}
