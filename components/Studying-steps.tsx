'use client'
import React, { useEffect } from "react";
import "aos/dist/aos.css";
import AOS from "aos";
import { FaLanguage, FaBook, FaChalkboardTeacher, FaLaptop, FaCertificate } from "react-icons/fa";

const StudyingSteps = () => {
    useEffect(() => {
        AOS.init();
    }, []);

    const steps = [
        {
            id: 1,
            title: "قم بانشاء حساب",
            description: "قم بالتسجيل وانظم الى منصتنا التعليمية",
            icon: <FaLanguage className="text-green-600 text-5xl" />,
        },
        {
            id: 2,
            title: "اختر الدورات التي تناسبك",
            description: " تصفح المنصة و استفيد من دوراتنا المتميزة",
            icon: <FaBook className="text-green-600 text-5xl" />,
        },
        {
            id: 3,
            title: "الانضمام الى الدورة",
            description: "بعد اختيارك للدورة اضغط على زر الاشتراك. ستجد طلبك قيد المعالجة",
            icon: <FaLaptop className="text-green-600 text-5xl" />,
        },
        {
            id: 4,
            title: "عملية الدفع",
            description: "تواصل معنا على قناة التلغرام و ارسل لنا صك الدفع و معلوماتك الشخصية",
            icon: <FaChalkboardTeacher className="text-green-600 text-5xl" />,
        },
        {
            id: 5,
            title: "الاستفادة من الدورة",
            description: "بعد معالج طلب الاشتراك. ستصبح الدورة متاحة",
            icon: <FaCertificate className="text-green-600 text-5xl" />,
        },
    ];

    return (
        <section className="bg-white py-12 flex flex-col justify-center items-center relative">
          <h1 className="text-[40px] text-center  sm:text-[60px] font-bold bg-gradient-to-r from-[#D6A959] via-[#C58B45] to-[#54371B] bg-clip-text text-transparent pb-6">
          مسارك للمشاركة في البرنامج
            </h1>
            <div className="container mx-auto px-4">
                {steps.map((step, index) => (
                    <div
                        key={step.id}
                        className="flex items-center bg-gray-50 rounded-lg shadow-lg p-6 mb-6 transition-transform transform hover:-translate-y-1 justify-end"
                        data-aos="fade-up"
                        data-aos-delay={index * 100}
                    >
                        {/* Step Number */}
                        <div className="mr-6 text-end">
                            <h3 className="text-xl font-semibold text-gray-800">
                                {step.title}
                            </h3>
                            <p className="text-gray-600">{step.description}</p>
                        </div>
                        <div className="flex-shrink-0 text-4xl font-bold text-gold w-16 h-16 flex items-center justify-center bg-gray-100 rounded-full">
                            {step.id}
                        </div>

                    </div>
                ))}
            </div>
            <div className="py-6">
                <a href="/search" className="relative text-white text-[24px] px-8 py-3 rounded-xl bg-gradient-to-r from-[#D6A959] to-[#54371B] hover:opacity-90  transition-transform transform hover:scale-105 font-sans font-normal">
                    ابدا رحلتك معنا الان
                </a>
            </div>
        </section>
    );
}

export default StudyingSteps;
