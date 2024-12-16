import { auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";

import { db } from "@/lib/db";
import { SearchInput } from "@/components/search-input";
import { getCourses } from "@/actions/get-courses";
import { CoursesList } from "@/components/courses-list";
import { Categories } from "./_components/categories";
import { CourseCard } from "@/components/course-card";
import { Navbar } from "../../_components/navbar";
import { FaSearch, FaRegSadTear } from "react-icons/fa";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { isTeacher } from "@/lib/teacher";

interface SearchPageProps {
  searchParams: Promise<{
    title: string;
    categoryId: string;
  }>;
}

const SearchPage = async ({ searchParams }: SearchPageProps) => {
  const resolvedSearchParams = await searchParams;

  const { userId } = auth();

  let isTeacherFlag = false; // Default to false
  if (userId) {
    try {
      isTeacherFlag = await isTeacher(userId); // Await the function
    } catch (error) {
      console.error("Failed to determine teacher status:", error);
    }
  }

  const [categories, courses] = await Promise.all([
    db.category.findMany({
      orderBy: {
        name: "asc",
      },
    }),
    getCourses({
      userId: userId || "2324324334", // Fallback for courses
      ...resolvedSearchParams,
    }),
  ]);

  return (
    <section className="relative -z-0">
      <div className="py-4 mb-8 ">
        <div className="container mx-auto flex justify-between items-center px-6 border-b-2 pb-8 gap-8 sm:gap-0">
          <SearchInput />
          <h1 className="text-yellow text-3xl sm:text-5xl font-semibold text-gray-600">ابحث عن دورة تعليمية</h1>
        </div>
      </div>
      <div className="space-y-4 flex flex-row items-center justify-around">
        <Categories items={categories} />
      </div>

      <div className="flex flex-col items-center justify-center py-6"> {/* Updated to ensure proper centering */}
        <h2 className="text-2xl sm:text-4xl font-semibold text-gray-800 gap-3 text-center">
          ⭐️ اكتشف دوراتنا المتميزة ⭐️
        </h2>
      </div>

      <div className="flex flex-row items-center justify-around py-6">
        <div className="flex flex-col gap-4">
          <Link
            className="sm:hidden px-2 py-1 rounded-lg bg-gradient-to-r from-[#D6A959] to-[#54371B] text-lg font-bold text-white hover:bg-gradient-to-l hover:from-yellow-600 hover:to-yellow-400 shadow-md transform transition-transform duration-300 hover:-translate-y-1"
            href="/dashboard"
          >
            واجهة التحكم
          </Link>
          {isTeacherFlag && (
            <Link
              className="sm:hidden px-2 py-1 rounded-lg bg-gradient-to-r from-[#D6A959] to-[#54371B] text-lg font-bold text-white hover:bg-gradient-to-l hover:from-yellow-600 hover:to-yellow-400 shadow-md transform transition-transform duration-300 hover:-translate-y-1"
              href="/orders"
            >
              payments
            </Link>
          )}
        </div>

      </div>
      <div className="px-6 pb-20 pt-6 space-y-6 text-center">
        <div
          className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 sm:gap-4"
          style={{ direction: "rtl" }}
        >
          {courses.map((item) => (
            <CourseCard
              key={item.id}
              id={item.id}
              title={item.title}
              imageUrl={item.imageUrl!}
              chaptersLength={item.chapters.length}
              price={item.price!}
              progress={item.progress}
              category={item.category?.name!}
              teacher={item.teacher?.name || ""}
              field={item.field?.name || "N/A"}
            />
          ))}
        </div>
        {courses.length === 0 && (
          <div className="h-[60vh] flex flex-col justify-center items-center text-center">
            <FaRegSadTear className="text-6xl text-gray-500 mb-4" />
            <h1 className="text-3xl font-bold text-gray-500 mb-2">
              لا توجد دورات في هي المادة حاليا              </h1>
            <p className="text-lg text-gray-400">
              تابعنا على مواقع التواصل الاجتماعي لكل جديد            </p>
          </div>
        )}
      </div>
      <Link
        className="hidden sm:block absolute top-28 left-8 px-4 py-2 rounded-lg bg-gradient-to-r from-[#D6A959] to-[#54371B] text-lg font-bold text-white hover:bg-gradient-to-l hover:from-yellow-600 hover:to-yellow-400 shadow-md transform transition-transform duration-300 hover:-translate-y-1"
        href="/dashboard"
      >
        واجهة التحكم
      </Link>
      {isTeacherFlag && (
        <Link
          className="hidden sm:block absolute top-52 left-8 px-4 py-2 rounded-lg bg-gradient-to-r from-[#D6A959] to-[#54371B] text-lg font-bold text-white hover:bg-gradient-to-l hover:from-yellow-600 hover:to-yellow-400 shadow-md transform transition-transform duration-300 hover:-translate-y-1"
          href="/Admin/orders"
        >
          payments
        </Link>
      )}
    </section>
  );
};

export default SearchPage;
