'use client';
import { useEffect } from 'react';
import "aos/dist/aos.css";
import AOS from 'aos';
import Image from "next/image";
import Link from "next/link";

const Modules = [
    {
        id: 1,
        name: "العلوم الفيزيائية",
        image: "/images/physics.jpg",
        link: '/search?categoryId=674f91c79bdea5a2e9dafe01'
    },
    {
        id: 2,
        name: "الرياضيات",
        image: "/images/math.jpg",
        link: '/search?categoryId=674f91c79bdea5a2e9dafe02'
    },
    {
        id: 3,
        name: "علوم الطبيعة و الحياة",
        image: "/images/science.jpg",
        link: '/search?categoryId=674f91c79bdea5a2e9dafe03'
    },
    {
        id: 4,
        name: "اللغة العربية",
        image: "/images/arabic.jpg",
        link: '/search?categoryId=674f91c79bdea5a2e9dafe04'
    },
    {
        id: 5,
        name: "اللغة الإنجليزية",
        image: "/images/english.jpg",
        link: '/search?categoryId=674f91c79bdea5a2e9dafe05'
    },
    {
        id: 6,
        name: "اللغة الفرنسية",
        image: "/images/french.jpg",
        link: '/search?categoryId=674f91c79bdea5a2e9dafe06'
    },
];

const ModulesSection = () => {
    useEffect(() => {
        AOS.init();
    }, []);

    return (
        <section className="relative ">
            <div className="py-12 flex flex-col items-center justify-center gap-4" data-aos="fade-up">
            <h1 className="text-[60px] font-bold bg-gradient-to-r from-[#D6A959] via-[#C58B45] to-[#54371B] bg-clip-text text-transparent ">
            التعليم للجميع</h1>
                <p className="font-bold text-[26px] text-gray-600  text-center">دورات تدريبية عبر الإنترنت وفرص تعلم ميسورة التكلفة</p>
                <p className="font-bold text-[22px] text-gray-600 text-center">العثور على مساحتك الخاصة والاستفادة من خيارات التعلم الأفضل يمكن ان يؤدي إلى اسرع من الطرق التقليدية. استمتع بجمال التعلم الإلكتروني</p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 w-[90%] sm:w-[70%] mx-auto justify-center items-center">
                {Modules.map((module, _index) => (
                    <div key={_index} data-aos="fade-up" data-aos-delay={_index * 100}>
                        <div className="p-6 bg-gradient-to-r from-[#ffe2b1] to-[#ffd8b4] rounded-xl justify-center items-center flex flex-col shadow-md hover:shadow-xl transform transition duration-300 relative gap-2">
                            <Image src={module.image} alt={module.name} width={150} height={150} className="rounded-full pb-2" />
                            <p className="text-center font-bold text-gray-700 text-[24px]">{module.name}</p>
                            <Link
                                href={module.link}
                                className="text-white text-[24px]  px-4 py-1 rounded-xl bg-gradient-to-r from-[#D6A959] to-[#54371B] hover:opacity-90 transform hover:scale-105 transition duration-300 font-normal font-sans text-center"
                                style={{ zIndex: 100 }}
                            >
                                تصفح الدورات
                            </Link>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default ModulesSection;
