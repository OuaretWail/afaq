import { Category, Course, Field, Teacher } from "@prisma/client";

import { getProgress } from "@/actions/get-progress";
import { db } from "@/lib/db";

type CourseWithProgressWithCategory = Course & {
  category: Category | null;
  chapters: { id: string }[];
  progress: number | null;
  teacher: { name: string } | null; // Only include name
  field: { name: string } | null; // Only include name
};

type GetCourses = {
  userId: string;
  title?: string;
  categoryId?: string;
};

export const getCourses = async ({
  userId,
  title = "",
  categoryId,
}: GetCourses): Promise<CourseWithProgressWithCategory[]> => {
  try {
    const courses = await db.course.findMany({
      where: {
        isPublished: true,
        title: {
          contains: title,
        },
        categoryId,
      },
      include: {
        teacher: true, // Fetch all fields for Teacher
        field: true, // Fetch all fields for Field
        category: true,
        chapters: {
          where: {
            isPublished: true,
          },
          select: {
            id: true,
          },
        },
        purchases: {
          where: {
            userId,
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    // Map the fetched data to match the simplified type
    const coursesWithProgress: CourseWithProgressWithCategory[] = await Promise.all(
      courses.map(async (course) => {
        const progress =
          course.purchases.length > 0
            ? await getProgress(userId, course.id)
            : null;

        return {
          ...course,
          teacher: course.teacher
            ? { name: course.teacher.name } // Include only the name
            : null,
          field: course.field
            ? { name: course.field.name } // Include only the name
            : null,
          progress,
        };
      })
    );

    return coursesWithProgress;
  } catch (error) {
    console.error("[GET_COURSES]", error);
    return [];
  }
};
