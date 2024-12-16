import { auth } from '@clerk/nextjs';
import { db } from '@/lib/db';
import { NextResponse } from 'next/server';
import { ObjectId } from 'mongodb';  // Import ObjectId from mongodb to convert string to ObjectId

export async function POST(
  req: Request,
  { params }: { params: Promise<{ courseId: string }> } // Adjusted for Promise
) {
  try {
    const { userId } = auth();
    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    // Convert the courseId from string to ObjectId
    const courseId  = (await params).courseId;

    // Ensure the course exists and is accessible
    const course = await db.course.findUnique({
      where: { id: courseId },
    });

    if (!course) {
      return new NextResponse("Course not found", { status: 404 });
    }

    // Check if the user is already enrolled in this course
    const existingPurchase = await db.purchase.findUnique({
      where: {
        userId_courseId: {
          userId,
          courseId: courseId,
        },
      },
    });

    if (existingPurchase) {
      return new NextResponse("You are already enrolled in this course", { status: 400 });
    }

    // Create the purchase with 'PROCESSING' status
    const coursePurchase = await db.purchase.create({
      data: {
        userId,
        courseId: courseId,
        status: 'PROCESSING',
      },
    });

    return NextResponse.json(coursePurchase);
  } catch (error) {
    console.error("[PURCHASE_ERROR]", error);
    return new NextResponse("Internal Server Error. Check logs for details.", { status: 500 });
  }
}
