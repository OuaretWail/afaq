'use client'

import { useState, useEffect } from "react";

const reviews = [
    {
        id: 1,
        image: "/face1.jpg",
        name: "مهدي يحي",
        text: "أفضل منصة تعليمية تعاملت معها على الإطلاق! الدروس ممتازة، والطريقة التفاعلية تجعل التعلم ممتعًا. جزيل الشكر للفريق القائم على هذا العمل الرائع.",
    },
    {
        id: 2,
        image: "/face2.jpg",
        name: "خليل ريان",
        text: "شكراً جزيلاً لهذه المنصة المدهشة! لقد ساعدتني على تحسين مستواي التعليمي وفهم المواد بسهولة. أنصح الجميع بالانضمام إليها.",
    },
    {
        id: 3,
        image: "/face3.jpg",
        name: "سليم مسعودي",
        text: "منصة تعليمية رائعة! استفدت كثيرًا من الدروس المقدمة، فهي واضحة ومنظمة بشكل احترافي. أشكركم على مجهودكم الكبير في توفير هذا المحتوى المميز.",
    },
];

const ReviewsSlider = () => {
    const [currentSlide, setCurrentSlide] = useState(0);

    const nextSlide = () => {
        setCurrentSlide((prev) => (prev + 1) % reviews.length);
    };

    const prevSlide = () => {
        setCurrentSlide((prev) => (prev - 1 + reviews.length) % reviews.length);
    };

    useEffect(() => {
        const interval = setInterval(nextSlide, 5000);
        return () => clearInterval(interval);
    }, []);

    return (
        <div className="relative w-full max-w-4xl mx-auto overflow-hidden rounded-lg shadow-lg ">
            {/* Slides */}
            
            <div
                className="flex transition-transform duration-500"
                style={{ transform: `translateX(-${currentSlide * 100}%)` }}
            >
                {reviews.map((review, index) => (
                    <div
                        key={review.id}
                        className="flex-shrink-0 w-full p-6 text-center space-y-4"
                    >
                        <img
                            src={review.image}
                            alt={review.name}
                            className="w-24 h-24 mx-auto rounded-full"
                        />
                        <h3 className="text-4xl font-bold text-gray-700">{review.name}</h3>
                        <div className="flex justify-center text-[24px]">
                            ⭐️⭐️⭐️⭐️⭐️
                        </div>
                        <p className="text-gray-500 font-extrabold text-[20px]">{review.text}</p>
                    </div>
                ))}
            </div>

            {/* Navigation Controls */}
            <button
                onClick={prevSlide}
                className="absolute left-4 top-1/2 transform -translate-y-1/2 p-2 bg-gray-100 rounded-full shadow-lg hover:bg-gray-200 focus:outline-none "
            >
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    className="w-6 h-6 text-gray-800"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M15 19l-7-7 7-7"
                    />
                </svg>
            </button>
            <button
                onClick={nextSlide}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 p-2 bg-gray-100 rounded-full shadow-lg hover:bg-gray-200 focus:outline-none "
            >
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    className="w-6 h-6 text-gray-800"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 5l7 7-7 7"
                    />
                </svg>
            </button>
        </div>
    );
};

export default ReviewsSlider;
