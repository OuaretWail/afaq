"use client";

import { Book, Video } from "lucide-react";
import { FaChalkboardTeacher, FaBookOpen, FaMoneyBillWave } from "react-icons/fa";
import Image from "next/image";
import Link from "next/link";

interface Course {
    id: string;
    title: string;
    description?: string;
    imageUrl?: string;
    price?: number;
    isPublished: boolean;
    isVisible: boolean;
    teacherName: string;
    categoryName: string;
    fieldName: string;
    chapterCount: number;
    createdAt: string;
    updatedAt: string;
}

interface CourseCardProps {
    course: Course;
}

const CourseCard: React.FC<CourseCardProps> = ({ course }) => {
    return (
        <div className="flex flex-col items-center bg-white rounded-2xl shadow-xl transition-transform transform hover:scale-105 hover:shadow-2xl overflow-hidden">
            <div className="w-full h-80 relative">
                <Image
                    src={course.imageUrl || "/placeholder.jpg"} // Fallback image
                    alt={course.title}
                    fill
                    className="rounded-t-2xl object-cover"
                />
            </div>

            <div className="w-full p-4 flex flex-col">
                <h2 className="text-lg sm:text-2xl font-bold text-gray-700 text-center">{course.title}</h2>

                <div className="flex items-center gap-2 text-yellow-600 justify-center mt-2">
                    <FaChalkboardTeacher size={20} />
                    <span className="text-xl font-semibold">{course.teacherName || "غير متوفر"}</span>
                </div>

                <div className="flex items-center justify-between mt-3">
                    <div className="flex items-center gap-2 text-blue-600">
                        <FaBookOpen size={18} />
                        <span className="text-sm font-semibold">{course.categoryName || "غير مصنف"}</span>
                    </div>
                    <div className="flex items-center gap-2 text-blue-600">
                        <Video size={18} />
                        <p className="text-sm font-semibold">دروس</p>
                        <span className="text-sm font-semibold">{course.chapterCount || "غير محدد"}</span>
                    </div>
                </div>

                <div className="flex items-center justify-center gap-2 text-gray-500 bg-yellow-100 px-3 py-1 rounded-full max-w-max mx-auto">
                    <Book size={18} />
                    <span className="text-md font-bold">{course.fieldName || "غير محدد"}</span>
                </div>

                <div className="flex items-center justify-between mt-3">
                    <div className="flex items-center gap-2 text-green-600">
                        <FaMoneyBillWave size={18} />
                        <span className="text-md font-bold">{course.price} دج</span>
                    </div>
                    <Link
                        href={`/courses/${course.id}`}
                        className="px-5 py-2 bg-gradient-to-r from-yellow-400 to-yellow-600 text-white font-extrabold text-sm rounded-lg shadow-lg hover:from-yellow-500 hover:to-yellow-700 transition-all inline-block text-center"
                    >
                        ابدأ الآن
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default CourseCard;
