import { auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";

import { db } from "@/lib/db";

import { getProgress } from "@/actions/get-progress";

import { CourseSidebar } from "./_components/course-sidebar";
import { CourseNavbar } from "./_components/course-navbar";
import getSafeProfile from "@/actions/get-safe-profile";
import Footer from "@/components/Footer";
import Nav_Bar from "@/components/navBar";

const CourseLayout = async ({
  children,
  params
}: {
  children: React.ReactNode;
  params: { courseId: string };
}) => {
  const { userId } = auth();
  if (!userId) {
    return redirect("/")
  }

  const course = await db.course.findUnique({
    where: {
      id: params.courseId,
    },
    include: {
      chapters: {
        where: {
          isPublished: true,
        },
        include: {
          userProgress: {
            where: {
              userId,
            }
          }
        },
        orderBy: {
          position: "asc"
        }
      },
    },
  });

  if (!course) {
    return redirect("/");
  }


  // @ts-ignore
  const progressCount: number = await getProgress(userId, course.id);

  return (

    <div className="h-full flex flex-col">
      {/* Navigation Bar */}
      <Nav_Bar />

      {/* Course Navbar */}
      <div className="h-[80px] w-full z-50">
        <CourseNavbar course={course} progressCount={progressCount} />
      </div>

      {/* Main Content Area */}
      <div className="flex flex-1">
        {/* Sidebar for larger screens */}
        <main className="flex-1">{children}</main>
        <aside className="hidden md:flex w-80 h-full">
          <CourseSidebar course={course} progressCount={progressCount} />
        </aside>

        {/* Main Content */}
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
}

export default CourseLayout