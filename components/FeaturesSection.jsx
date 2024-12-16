'use client'


import React, { useEffect } from "react";
import "aos/dist/aos.css";
import AOS from "aos";

const FeaturesSection = () => {
  useEffect(() => {
    AOS.init();
  }, []);

  return (
    <section className="py-16 px-4">
      <div className="container mx-auto">
        <h2 className="text-[30px] sm:text-[60px] font-bold bg-gradient-to-r from-[#D6A959] via-[#C58B45] to-[#54371B] bg-clip-text text-transparent pb-6 text-center">
          ما الذي يميز أكادمية آفاق عن باقي المنصات
        </h2>

        <div className="w-[90%] sm:w-[500px] mx-auto flex flex-wrap gap-16 items-center justify-center">
          <div className="items-center flex flex-col" data-aos="zoom-in" data-aos-delay="100">
            <img src="/icon1.png" alt="" className="h-24" />
            <p className="text-[20px] font-extrabold text-gray-600">محتوى تفاعليّ</p>
          </div>
          <div className="items-center flex flex-col" data-aos="zoom-in" data-aos-delay="200">
            <img src="/icon2.png" alt="" className="h-24" />
            <p className="text-[20px] font-extrabold text-gray-600">متعلّم متحفّز</p>
          </div>
          <div className="items-center flex flex-col" data-aos="zoom-in" data-aos-delay="300">
            <img src="/icon3.png" alt="" className="h-24" />
            <p className="text-[20px] font-extrabold text-gray-600">معلّم واثق</p>
          </div>
          <div className="items-center flex flex-col" data-aos="zoom-in" data-aos-delay="400">
            <img src="/icon4.png" alt="" className="h-24" />
            <p className="text-[20px] font-extrabold text-gray-600">أدلّة واضحة حول تحسّن نتائج المُتعلّمين</p>
          </div>
          <div className="items-center flex flex-col" data-aos="zoom-in" data-aos-delay="500">
            <img src="/icon5.png" alt="" className="h-24" />
            <p className="text-[20px] font-extrabold text-gray-600">طرائق تعليم تتمحور حول المُتعلّم</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
