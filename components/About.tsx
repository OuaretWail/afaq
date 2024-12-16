'use client'

import { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import Link from "next/link";
import { Wave } from "./Wave";

const About = () => {
  useEffect(() => {
    AOS.init({ duration: 1000 });
  }, []);

  return (
    <div id="about" className="relative  rounded-b-full overflow-visible">


      {/* Main Content */}
      <div className="flex flex-col-reverse sm:grid sm:grid-cols-2 mx-auto px-12 pb-8 pt-24 relative ">
        {/* Image Section */}
        <div
          className="flex justify-center items-center"
          data-aos="fade-right"
        >
          <div className="relative group pt-8 sm:pt-0">
            <img
              src="/images/about.jpg"
              alt="about the academy"
              className="sm:h-80 h-48 pt-6 sm:pt-0 transition-transform duration-500 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-yellow-400 bg-opacity-0 group-hover:bg-opacity-10 rounded-full transition-all duration-500"></div>
          </div>
        </div>

        {/* Text Section */}
        <div
          className="text-center sm:text-end flex flex-col gap-8"
          data-aos="fade-left"
        >
          <p className="text-[35px] sm:text-[60px] font-bold bg-gradient-to-r from-[#D6A959] via-[#C58B45] to-[#54371B] bg-clip-text text-transparent ">
            عن برنامج أكاديمية آفاق
          </p>
          <p className="text-[24px]  text-gray-700 leading-relaxed font-normal font-sans">
            التعليم عن بُعد بأسلوب مبتكر
            توفر منصة آفاق تجربة تعليمية متكاملة تهدف إلى دعم تلاميذ وطلاب الجزائر في تحقيق النجاح والتفوق في مختلف الأطوار التعليمية.
            نتميز بـ:
            دروس مباشرة صوت وصورة عبر تطبيق Zoom، تحت إشراف نخبة من الأساتذة المختصين.
            تدريس جميع المواد والمراحل الدراسية بأسعار تناسب الجميع.
            سهولة متابعة الدروس باستخدام الهاتف أو الحاسوب.
            بعد كل حصة، ستجد في موقعنا:
            تسجيلات الحصة بالكامل لتتمكن من المراجعة في أي وقت.
            كتب ومراجع معتمدة تم استخدامها خلال الدرس               </p>
          {/* Button */}
          <div className="self-center justify-center items-center ">
            <Link
              href="https://www.instagram.com/afaqaacademie?igsh=emxsaTJvc3hjaGRq"
              className="text-white text-[24px] px-8 py-3 rounded-xl bg-gradient-to-r from-[#D6A959] to-[#54371B] hover:opacity-90 shadow-lg hover:shadow-2xl transform hover:-translate-y-1 transition duration-500 font-normal font-sans"
            >
             تعرف علينا اكثر
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
