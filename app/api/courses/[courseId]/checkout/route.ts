import { db } from "@/lib/db";
import { currentUser } from "@clerk/nextjs";
import { NextResponse } from "next/server";

export async function POST(
    req: Request,
    context: { params: Promise<{ courseId: string }> } // Adjusted type for params
) {
    try {
        const user = await currentUser();

        if (!user || !user.id) {
            return new NextResponse("Unauthorized", { status: 401 });
        }

        const { courseId } = await context.params; // Await the params

        const course = await db.course.findUnique({
            where: {
                id: courseId,
                isPublished: true,
            },
        });

        if (!course) {
            return new NextResponse("Course Not Found", { status: 404 });
        }

        const existingPurchase = await db.purchase.findUnique({
            where: {
                userId_courseId: {
                    userId: user.id,
                    courseId: courseId,
                },
            },
        });

        if (existingPurchase) {
            return new NextResponse("Course Already Purchased", { status: 400 });
        }

        // Mark course as purchased in the database
        await db.purchase.create({
            data: {
                userId: user.id,
                courseId: courseId,
            },
        });

        return new NextResponse("Course Successfully Purchased", { status: 200 });
    } catch (error) {
        console.error("Error in purchasing course:", error);
        return new NextResponse("Internal Server Error", { status: 500 });
    }
}
