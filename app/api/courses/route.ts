import { db } from "@/lib/db";
import { isTeacher } from "@/lib/teacher";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

export async function POST(
    req: Request,
) {
    try {
        const { userId } =  auth(); // Correct way
        const { title } = await req.json();

        if (!userId || !isTeacher(userId)) {
            return new NextResponse("Unauthorized", { status: 401 });
        }   

        const course = await db.course.create({
            data: {
                userId,
                title,
            },
        });

        return NextResponse.json(course);

    } catch (error) {
        console.log("[COURSES]", error);
        return new NextResponse("Internal Server Error", { status: 500 });
    }

}




export async function GET(req: Request) {
    try {
        // Fetch courses that are published and visible (for public access)
        const courses = await db.course.findMany({
            where: {
                isPublished: true,
                isVisible: true,
            },
            include: {
                teacher: { select: { name: true } }, // Include the teacher's name
                category: { select: { name: true } }, // Include the category name
                field: { select: { name: true } }, // Include the field name
                chapters: true, // Include chapters (to count them later)
            },
        });

        // Format the data (add chapter count)
        const formattedCourses = courses.map((course) => ({
            id: course.id,
            title: course.title,
            description: course.description,
            imageUrl: course.imageUrl,
            price: course.price,
            isPublished: course.isPublished,
            isVisible: course.isVisible,
            teacherName: course.teacher?.name || "Unknown", // Handle case where no teacher
            categoryName: course.category?.name || "No Category",
            fieldName: course.field?.name || "No Field",
            chapterCount: course.chapters.length, // Count the chapters
            createdAt: course.createdAt,
            updatedAt: course.updatedAt,
        }));

        return NextResponse.json(formattedCourses);
    } catch (error) {
        console.error("[GET /api/[courses] Error:", error);
        return new NextResponse("Internal Server Error", { status: 500 });
    }
}