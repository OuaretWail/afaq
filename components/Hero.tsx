'use client';

import { useEffect, useState } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import { useAuth } from "@clerk/nextjs"; // Import useAuth from Clerk
import Link from "next/link";

const Hero = () => {
  const { userId } = useAuth(); // Check if the user is authenticated via userId
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    setIsLoggedIn(!!userId); // Check if userId exists (i.e., user is authenticated)
    AOS.init({ duration: 1000 });
  }, [userId]);

  return (
    <div>
      <section className="flex flex-col-reverse sm:grid sm:grid-cols-2 container mx-auto px-4 sm:px-0 pt-3 items-center justify-center pb-28 relative">
        {/* Image Section */}
        <div
          className="flex justify-center items-center pb-16 sm:pb-0"
          data-aos="fade-right"
        >
          <img
            src="/hero.png"
            alt="Zad Academy"
            className="h-52 sm:h-80 md:h-96 lg:h-[450px] w-auto object-contain transition-transform duration-500 hover:scale-105"
          />
        </div>

        {/* Text Section */}
        <div
          className="justify-center items-center flex flex-col gap-6 pb-16"
          data-aos="fade-left"
        >
          <p className="text-[48px] font-bold text-gray-700 text-center">
            منصة آفاق التعليمية
          </p>
          <span className="text-[40px] sm:text-[60px] font-bold bg-gradient-to-r from-[#D6A959] via-[#C58B45] to-[#54371B] bg-clip-text text-transparent text-center">
            الخبير في كل شيء كان مبتدئًا في يومٍ ما
          </span>

          <p className="text-[24px] text-gray-500 leading-relaxed text-end font-normal font-sans">
            توفر لك منصة آفاق تجربة تعليمية شاملة ومبتكرة عبر الإنترنت، تجمع بين الراحة والمرونة لتجعل التعلم أكثر متعة وسهولة. لن تواجه أي صعوبات أثناء متابعة دروسك من مكانك المفضل وفي وقتك الخاص. من خلال أساليبنا التعليمية المتطورة ومبادراتنا المرنة، ستتمكن من التعلم بشكل أسرع وأكثر كفاءة مقارنة بالطرق التقليدية، مما يفتح لك أفقًا جديدًا للنجاح والتفوق
          </p>
        </div>

        {/* Floating Card Section */}
        <div
          className="w-[300px] bg-white absolute -bottom-16 rounded-2xl justify-center items-center py-4 px-4 flex flex-col gap-4 sm:left-1/2 sm:-translate-x-1/2 shadow-lg hover:shadow-xl transition-shadow duration-300 z-50"
          data-aos="fade-up"
        >
          {!isLoggedIn ? (
            <>
              <p className="text-[26px] text-gray-600 font-normal font-sans">
                التسجيل متاح الان
              </p>
              <p className="text-[18px] text-gold font-normal font-sans text-center">
                سجل الان و ابدأ رحلة التميز في البكالوريا
              </p>

              <a
                href="/sign-in"
                className="text-white text-[24px] px-8 py-2 rounded-xl bg-gradient-to-r from-[#D6A959] to-[#54371B] hover:opacity-90 transform hover:scale-105 transition duration-300 font-normal font-sans text-center"
              >
                سجل الان
              </a>
            </>
          ) : (
            <>
              <p className="text-[26px] text-gray-600 font-normal font-sans">
                مرحباً بك في حسابك
              </p>
              <p className="text-[18px] text-gold font-normal font-sans text-center">
                استمتع بالتعلم وابدأ دروسك الآن
              </p>

              <Link
                href="/search"
                className="text-white text-[24px] px-8 py-2 rounded-xl bg-gradient-to-r from-[#D6A959] to-[#54371B] hover:opacity-90 transform hover:scale-105 transition duration-300 font-normal font-sans text-center"
              >
                انطلق الآن
              </Link>
            </>
          )}
        </div>
      </section>
    </div>
  );
};

export default Hero;
