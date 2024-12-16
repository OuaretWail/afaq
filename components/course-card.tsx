'use client'

import Image from "next/image";
import Link from "next/link";
import { Book, BookOpen, Rocket, Video } from "lucide-react";
import { FaBookOpen, FaChalkboardTeacher, FaMoneyBillWave } from "react-icons/fa";
import { useAuth } from "@clerk/nextjs"; // Import useAuth from Clerk
import { CourseProgress } from "@/components/course-progress";

interface CourseCardProps {
  id: string;
  title: string;
  imageUrl: string;
  chaptersLength: number;
  price: number;
  progress: number | null;
  category: string;
  teacher: string;
  field: string;
}

export const CourseCard = ({
  id,
  title,
  imageUrl,
  chaptersLength,
  price,
  progress,
  category,
  teacher,
  field,
}: CourseCardProps) => {
  const { userId } = useAuth(); // Check if the user is authenticated

  const handleClick = (e: React.MouseEvent) => {
    if (!userId) {
      e.preventDefault(); // Prevent navigation
      // You can also programmatically navigate to the sign-in page if you prefer
      window.location.href = "/sign-in"; // Redirect the user to the sign-in page
    }
  };

  return (
    <Link href={`/courses/${id}`} passHref>
      <div
        onClick={handleClick} // Add click handler
        className="flex flex-col bg-white rounded-3xl shadow-lg overflow-hidden transition-transform transform hover:scale-105 hover:shadow-xl group -z-10"
        style={{ direction: "ltr" }}
      >
        {/* Course Image */}
        <div className="relative w-full h-80">
          <Image
            src={imageUrl || "/default-image.jpg"} // Fallback image
            alt={title}
            fill
            className="object-cover rounded-t-3xl group-hover:opacity-90 transition"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent rounded-t-3xl opacity-0 group-hover:opacity-100 transition flex items-end p-4">
            <p className="text-white text-sm font-medium">{category || "غير مصنف"}</p>
          </div>
          <div className="absolute bottom-0 right-0 bg-gradient-to-t from-black/60 to-transparent rounded-t-3xl opacity-0 group-hover:opacity-100 transition flex items-end p-4">
            <p className="text-white text-sm font-medium">{field || "غير مصنف"}</p>
          </div>
        </div>

        {/* Course Details */}
        <div className="p-4 flex flex-col gap-2">
          {/* Title */}
          <h2 className="text-xl font-semibold text-gray-800 line-clamp-2 group-hover:text-blue-600 transition text-center">
            {title}
          </h2>

          {/* Teacher */}
          <div className="flex items-center justify-center gap-2 text-yellow-600">
            <FaChalkboardTeacher size={20} />
            <span className="text-md font-medium">{teacher || "غير متوفر"}</span>
          </div>

          {/* Category and Chapters */}
          <div className="flex items-center justify-between mt-2 text-sm text-gray-600">
            <div className="flex items-center gap-2">
              <FaBookOpen size={18} className="text-blue-600" />
              <span>{category || "غير مصنف"}</span>
            </div>
            <div className="flex items-center gap-2">
              <Video size={18} className="text-blue-600" />
              <span>
                {chaptersLength} {chaptersLength === 1 ? "Chapter" : "Chapters"}
              </span>
            </div>
          </div>

          {/* Price or Progress */}
          {progress !== null ? (
            <CourseProgress
              variant={progress === 100 ? "success" : "default"}
              size="sm"
              value={progress}
            />
          ) : (
            <div className="flex flex-row items-center justify-between pt-2">
              <div className="flex items-center gap-2 text-green-600">
                <FaMoneyBillWave size={18} />
                <span className="text-md font-bold">{price} دج</span>
              </div>
              <Link
                href={`/courses/${id}`}
                className="px-5 py-2 bg-gradient-to-r from-yellow-300 to-yellow-500 text-white font-extrabold text-sm rounded-lg shadow-lg hover:from-yellow-500 hover:to-yellow-700 transition-all flex gap-2 text-center items-center"
              >
                <Rocket />
                ابدأ الآن
              </Link>
            </div>
          )}
        </div>
      </div>
    </Link>
  );
};
