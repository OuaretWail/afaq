'use client'

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowDownIcon } from "lucide-react";
import AOS from "aos";
import "aos/dist/aos.css";

const faqs = [
    {
        question: "هل توجد دورات فردية ؟",
        answer: "نعم، يمكن توفير دورات فردية حسب الطلب.",
    },
    {
        question: "هل يمكن الانضمام في أي وقت أم انتظر دورة معينة؟",
        answer: "يمكن الانضمام في أي وقت إذا كانت الدورة مفتوحة.",
    },
    {
        question: "ماهو سعر الدورة وهل توجد تخفيضات؟",
        answer: "تختلف الأسعار حسب الدورة، وهناك تخفيضات متاحة أحيانًا.",
    },
    {
        question: "هل الدروس مسجلة أونلاين ويمكن أن أرجع لها لاحقًا؟",
        answer: "نعم، الدروس مسجلة ويمكنك الرجوع إليها لاحقًا.",
    },
    {
        question: "كيف يمكنني التسجيل ودفع مستحقات الدورة؟",
        answer: "يمكنك التسجيل عبر الموقع الإلكتروني والدفع بطرق متعددة (بطاقة ائتمان أو تحويل بنكي) تواصل معانا على الانستاغرام",
    },
];

const Fqs = () => {
    useEffect(() => {
        AOS.init();
    }, []);

    const [openQuestionIndex, setOpenQuestionIndex] = useState<number | null>(null);

    const toggleQuestion = (index: number) => {
        setOpenQuestionIndex(openQuestionIndex === index ? null : index);
    };

    return (
        <section className="container mx-auto px-4 py-12 relative  ">
          <h2 className="text-[60px] font-bold bg-gradient-to-r from-[#D6A959] via-[#C58B45] to-[#54371B] bg-clip-text text-transparent pb-6 text-end">
          أسئلة شائعة
            </h2>
            <div className="space-y-4">
                {faqs.map((faq, index) => (
                    <div
                        key={index}
                        className="bg-white border border-gray-300 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 "
                        data-aos="fade-up"
                        data-aos-delay={index * 100}
                    >
                        {/* Question */}
                        <div
                            className="flex justify-between items-center p-4 cursor-pointer bg-gradient-to-r from-[#ffe2b1] to-[#ffc288]  transition-all gap-6 text-end"
                            onClick={() => toggleQuestion(index)}
                        >
                            <motion.span
                                animate={{ rotate: openQuestionIndex === index ? 180 : 0 }}
                                transition={{ duration: 0.3 }}
                                className="text-gray-500 z-20"
                            >
                                <ArrowDownIcon />
                            </motion.span>
                            <div className="flex items-center gap-2 text-lg font-semibold text-gray-700 ">
                                {faq.question}
                            </div>
                        </div>

                        {/* Answer */}
                        <AnimatePresence>
                            {openQuestionIndex === index && (
                                <motion.div
                                    initial={{ opacity: 0, height: 0 }}
                                    animate={{ opacity: 1, height: "auto" }}
                                    exit={{ opacity: 0, height: 0 }}
                                    className="overflow-hidden z-20"
                                >
                                    <div className="flex justify-between items-start p-4 cursor-pointer bg-gradient-to-r from-yellow-100 to-white hover:from-yellow-200 transition-all leading-relaxed flex-row-reverse">
                                        {faq.answer}
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>
                ))}
            </div>
        </section>
    );
}

export default Fqs;
