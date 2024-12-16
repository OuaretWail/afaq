'use client';

import { Teacher } from '@prisma/client';
import { useState, useEffect } from 'react';
import Image from 'next/image';
import { FaSearch, FaStar, FaRegSun, FaRegMoon } from 'react-icons/fa';
import { motion } from 'framer-motion'; // For animations
import Skeleton from 'react-loading-skeleton'; // For skeleton loaders
import 'react-loading-skeleton/dist/skeleton.css'; // Skeleton styles
import Link from 'next/link';

// Define a type to include the category name
type TeacherWithCategory = Teacher & {
  category: { name: string | null };
};

const TeachersPage = () => {
  const [teachers, setTeachers] = useState<TeacherWithCategory[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    // Fetch teachers from API
    const fetchTeachers = async () => {
      try {
        setLoading(true);
        const res = await fetch('/api/teacher');
        const data = await res.json();
        setTeachers(data);
      } catch (error) {
        console.error('Error fetching teachers:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchTeachers();
  }, []);


  return (
    <div
      className={`min-h-screen text-gray-800 p-6`}
    >

      <h1 className="text-[40px] sm:text-[60px] font-bold text-gold  text-center">
    نخبةٌ اساتذة الجزائر      </h1>

      {/* Teacher Cards */}
      <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
        {loading
          ? Array.from({ length: 6 }).map((_, i) => (
            <Skeleton key={i} height={300} className="rounded-lg" />
          ))
          :teachers && teachers.map((teacher) => (
            <motion.div
              key={teacher.id}
              className="bg-white dark:bg-gray-800 dark:text-gray-200 rounded-lg shadow-lg p-4 hover:shadow-2xl transform hover:-translate-y-2 transition-all duration-300"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4, delay: 0.2 }}
            >
              {/* Image Section */}
              <div className="relative aspect-square overflow-hidden rounded-t-lg">
                <Image
                  src={teacher.imageUrl || '/placeholder-teacher.jpg'}
                  alt={teacher.name}
                  fill
                  className="object-cover"
                />
              </div>

              {/* Content Section */}
              <div className="pt-4">
                <h2 className="text-xl font-bold text-blue-600 dark:text-blue-300 text-center">
                  {teacher.name}
                </h2>

                <div className="mb-4 mt-2 flex justify-center">
                  <span className="bg-blue-100 dark:bg-blue-600 text-blue-600 dark:text-blue-100 px-3 py-1 text-sm rounded-full shadow-md">
                    {teacher.category?.name || 'Uncategorized'}
                  </span>
                </div>


                {/* Rating and Profile Link */}
                <div className="mt-6 flex justify-between items-center text-sm">
                  <div className="flex items-center gap-1 text-yellow-500">
                    <FaStar />
                    <FaStar />
                    <FaStar />
                    <FaStar />
                    <FaStar />
                  </div>
                  <Link
                    href={`/profs/${teacher.id}`}
                    className="text-white text-[18px] px-4 py-3 rounded-xl bg-gradient-to-r from-[#D6A959] to-[#54371B] hover:opacity-90 shadow-lg hover:shadow-2xl transform hover:-translate-y-1 transition duration-500 font-normal font-sans"
                    >
                     حول الأستاذ
                  </Link>
                </div>
              </div>
            </motion.div>
          ))}
      </div>

    </div>
  );
};

export default TeachersPage;
