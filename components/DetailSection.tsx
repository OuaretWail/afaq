'use client'
import Image from "next/image";
import { Wave } from "./Wave";
import Link from "next/link";

const DetailSection = () => {
  return (
    <section className="bg-white py-10 px-5 md:px-20 relative overflow-hidden sm:w-[80%] mx-auto">
      {/* Decorative Background Elements */}
      <div className="absolute top-0 left-0 w-24 h-24 bg-blue-100 rounded-full blur-3xl opacity-50"></div>
      <div className="absolute bottom-0 right-0 w-32 h-32 bg-yellow-100 rounded-full blur-3xl opacity-50"></div>

      <div className="grid md:grid-cols-2 gap-10 relative  justify-center items-center mx-auto">
        {/* Text Content */}
        <div data-aos="fade-right">
        <h2 className="text-[40px] font-bold bg-gradient-to-r from-[#D6A959] via-[#C58B45] to-[#54371B] bg-clip-text text-transparent text-center sm:text-end pb-2">
        التعلم عبر الإنترنت
          </h2>
          <p className="text-gray-700 text-lg mb-4 leading-relaxed text-center sm:text-end">
            طور مستواك الدراسي، واحصل على أفضل معدل في البكالوريا. وادرس من أي
            مكان في الوطن!
          </p>
          <p className="text-gray-600 mb-4 text-center sm:text-end">
            نحن نقدم بشكل أفضل التعلم عبر الإنترنت بحيث أن يحدث تغييراً كبيراً
            للوصول إلى أفضل النتائج. وتقديم خيارات للتعلم مع أفضل الأساتذة في
            الوطن.
          </p>
          {/* Features */}
          <div className="flex flex-wrap gap-4 text-gray-700 text-center sm:text-end justify-center sm:justify-end ">
            <div className="flex items-center gap-2 transition-transform duration-300 hover:scale-105">
              <span className="text-blue-500 text-xl">🌍</span>
              <span>إمكانية الوصول في كل الوطن</span>
            </div>
            <div className="flex items-center gap-2 transition-transform duration-300 hover:scale-105">
              <span className="text-green-500 text-xl">📚</span>
              <span>التعلم عن بعد</span>
            </div>
            <div className="flex items-center gap-2 transition-transform duration-300 hover:scale-105">
              <span className="text-yellow-500 text-xl">⏰</span>
              <span>التعلم في أي وقت</span>
            </div>
          </div>
          {/* Button */}
          <div className="mt-6 justify-center sm:justify-end flex">
            <Link href='/search'               className="text-white text-[24px]  px-8 py-2 rounded-xl bg-gradient-to-r from-[#D6A959] to-[#54371B] hover:opacity-90 transform hover:scale-105 transition duration-300 font-normal font-sans text-center"
            >
              تصفح الدورات
            </Link>
          </div>
        </div>
        {/* Image Section */}
        <div
          className="flex justify-center sm:justify-end items-center relative group"
          data-aos="fade-left"
        >
          <div className="relative w-64 h-64 md:w-80 md:h-80 rounded-lg overflow-hidden shadow-lg transition-transform duration-300 group-hover:scale-105">
            <Image
              src="/images/about1.jpg" // Replace with your image path
              alt="Online Learning"
              layout="fill"
              objectFit="cover"
              className="rounded-lg"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default DetailSection;