import { auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import { CheckCircle, Clock, Lock } from "lucide-react";

import { getCourses } from "@/actions/get-courses";
import { InfoCard } from "./_components/info-card";
import { CourseCard } from "@/components/course-card";

export default async function Dashboard() {
  const { userId } = auth();

  if (!userId) {
    return (
      <div className="flex flex-col justify-center items-center flex-1 h-[100vh]">
        <Lock className="w-28 h-28 text-gray-600" />
        <h1 className="text-center text-gray-600 text-[30px]">
          You have to sign in before coming to this page
        </h1>
        <div className="mt-4">
          <a
            href="/sign-in"
            className="text-white text-[24px] px-6 py-2 bg-blue-400 rounded-xl"
          >
            Sign In
          </a>
        </div>
      </div>
    );
  }

  // Fetch courses
  const courses = await getCourses({ userId });

  // Filter out courses with no progress (not purchased)
  const purchasedCourses = courses.filter((course) => course.progress !== null);

  // Calculate in-progress and completed courses
  const inProgressCourses = purchasedCourses.filter(
    (course) => course.progress && course.progress < 100
  );
  const completedCourses = purchasedCourses.filter(
    (course) => course.progress === 100
  );

  return (
    <div className="p-6 space-y-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {/* In Progress InfoCard */}
        <InfoCard
          icon={Clock}
          label="In Progress"
          numberOfItems={inProgressCourses.length}
          variant="default"
        />

        {/* Completed InfoCard */}
        <InfoCard
          icon={CheckCircle}
          label="Completed"
          numberOfItems={completedCourses.length}
          variant="success"
        />
      </div>

      {purchasedCourses.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 py-10">
          {purchasedCourses.map((item) => (
            <CourseCard
              key={item.id}
              id={item.id}
              title={item.title}
              imageUrl={item.imageUrl || ""}
              chaptersLength={item.chapters.length}
              price={item.price || 0}
              progress={item.progress || 0}
              category={item.category?.name || "Uncategorized"}
              teacher={item.teacher?.name || "Unknown Teacher"}
              field={item.field?.name || "N/A"}
            />
          ))}
        </div>
      ) : (
        <div className="text-center text-sm text-muted-foreground mt-10">
          No courses found
        </div>
      )}
    </div>
  );
}
