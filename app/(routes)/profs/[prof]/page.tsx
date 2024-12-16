import Preview from "@/components/preview";
import { db } from "@/lib/db";
import Link from "next/link";
import { redirect } from "next/navigation";
import Image from "next/image";
import { FaBookOpen, FaChalkboardTeacher } from "react-icons/fa";
import { Rocket, Video } from "lucide-react";
const page = async ({
  params,
}: {
  params: Promise<{ prof: string }>;
}) => {
  const teacherId = (await params).prof;

  if (!teacherId) {
    return redirect("/profs");
  }

  const teacher = await db.teacher.findUnique({
    where: {
      id: teacherId,
    },
    include: {
      category: true,
      courses: true, // Include related courses
    },
  });

  if (!teacher) {
    return <h1>Teacher not found</h1>;
  }

  return (
    <div className="min-h-screen  text-gray-800">
      {/* Header Section */}
      <div className=" text-white py-10 px-6">
        <div className="flex flex-col sm:flex-row max-w-5xl mx-auto  items-center">
          {/* Teacher Image */}
          <div className="flex-shrink-0 w-80 h-80 bg-white rounded-lg overflow-hidden shadow-lg">
            <img
              src={teacher.imageUrl || "/placeholder-avatar.png"}
              alt={teacher.name}
              className="w-full h-full object-cover"
            />
          </div>
          {/* Teacher Details */}
          <div className="ml-8 flex flex-col gap-4">
            <h1 className="text-5xl font-bold text-center text-gold">{teacher.name}</h1>
            <div
              className="text-center text-gray-500 text-xl font-bold"
              dangerouslySetInnerHTML={{ __html: teacher.description || "" }} // Render raw HTML content
            />
            <p className="mt-4 text-md font-bold text-blue-500">
              {teacher.category?.name || "Uncategorized"}
            </p>
            <div className="mt-4 flex gap-4">
              <Link href='#teacher-courses' className="px-5 py-2 bg-gradient-to-r from-yellow-400 to-yellow-600 text-white font-extrabold text-sm rounded-lg shadow-lg hover:from-yellow-500 hover:to-yellow-700 transition-all flex gap-2 text-center items-center">
                جميع دورات {teacher.name}
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Statistics Section */}
      <div className="bg-white py-10 shadow-md">
        <div className="max-w-5xl mx-auto  text-center">
          <h1 className="text-5xl font-bold text-gray-500">جميع دورات  {teacher.name}</h1>
        </div>
      </div>

      {/* Courses Section */}
      <div id="teacher-courses" className="max-w-5xl mx-auto py-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {teacher.courses.length > 0 ? (
            <div>
              {teacher.courses.map((course) => (
                <div
                  key={course.id}
                  className="flex flex-col items-center bg-white rounded-2xl shadow-xl transition-transform transform hover:scale-105 hover:shadow-2xl overflow-hidden"
                >
                  <div className="w-full h-80 relative">
                    <Image
                      src={course.imageUrl || "/placeholder.jpg"} // Fallback image
                      alt={course.title}
                      fill
                      className="rounded-t-2xl object-cover"
                    />
                  </div>

                  <div className="w-full p-6 flex flex-col ">
                    <h2 className="text-lg sm:text-2xl font-bold text-gray-700 text-center">
                      {course.title}
                    </h2>

                    <div className="flex items-center justify-between mt-4">
                      <Link
                        href={`/courses/${course.id}`}
                        className="px-5 py-2 bg-gradient-to-r from-yellow-400 to-yellow-600 text-white font-extrabold text-sm rounded-lg shadow-lg hover:from-yellow-500 hover:to-yellow-700 transition-all flex gap-2 text-center items-center"
                      >
                        <Rocket />
                        ابدأ الآن
                      </Link>

                    </div>
                  </div>
                </div>
              ))}

            </div>
          ) : (
            <p className="text-center text-gray-500">No courses available.</p>
          )}
        </div>
      </div>

    </div>
  );
};

export default page;
