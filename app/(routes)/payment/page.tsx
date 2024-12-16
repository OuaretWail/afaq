'use client';
import { useRouter } from "next/navigation";
import { FaTelegram, FaInstagram, FaCheckCircle } from "react-icons/fa";
import { HiOutlineMail } from "react-icons/hi";

const PaymentInstructionsPage = () => {
  const router = useRouter();

  return (
    <div className="min-h-screen  text-gray-800 dark:text-gray-200 flex flex-col items-center justify-center py-12 px-4 sm:px-6 lg:px-8" dir="rtl">
      <div className="bg-white dark:bg-gray-800 shadow-2xl rounded-3xl max-w-4xl w-full p-10 relative overflow-hidden">
        {/* Background Decorations */}

        <div className="text-right">
          <h1 className="text-4xl md:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-yellow-500 to-yellow-400 dark:from-yellow-300 dark:to-yellow-200 pb-4">
            طريقة دفع مستحقات الدورة
          </h1>
          <p className="text-lg md:text-xl text-gray-600 dark:text-gray-300 py-6">
            تابع الخطوات التالية لتسجيلك بسهولة والوصول إلى دورتك التعليمية.
          </p>
        </div>

        {/* Instructions Section */}
        <div className="space-y-8 text-gray-700 dark:text-gray-300 text-lg leading-relaxed">
          {/* Step 1 */}
          <div className="flex items-center gap-4 justify-start">
            <div className="w-12 h-12 flex items-center justify-center bg-yellow-500 text-white rounded-full shadow-md">
              <span>1</span>
            </div>
            <p>
              اختر الدورة التي تناسبك واضغط على{" "}
              <strong className="text-yellow-600 dark:text-yellow-300">
                الاشتراك في الدورة
              </strong>.
            </p>
          </div>

          {/* Step 2 */}
          <div className="flex items-center gap-4 justify-start">
            <div className="w-12 h-12 flex items-center justify-center bg-yellow-500 text-white rounded-full shadow-md">
              <span>2</span>
            </div>
            <div>
              <p>تواصل معنا على حساباتنا الرسمية:</p>
              <ul className="list-none mt-2 space-y-2 text-gray-600 dark:text-gray-400">
                <li className="flex items-center gap-3">
                  <FaTelegram className="text-yellow-500 text-xl" />
                  <strong>تلغرام</strong>
                </li>
                <li className="flex items-center gap-3">
                  <FaInstagram className="text-yellow-500 text-xl" />
                  <strong>انستغرام</strong>
                </li>
              </ul>
            </div>
          </div>

          {/* Step 3 */}
          <div className="flex items-center gap-4 justify-start">
            <div className="w-12 h-12 flex items-center justify-center bg-yellow-500 text-white rounded-full shadow-md">
              <span>3</span>
            </div>
            <div>
              <p>أرسل إلينا المعلومات التالية:</p>
              <ul className="list-none mt-2 space-y-2 text-gray-600 dark:text-gray-400">
                <li className="flex items-center gap-3">
                  <HiOutlineMail className="text-yellow-500 text-xl" />
                  <strong>الاسم الكامل</strong>
                </li>
                <li className="flex items-center gap-3">
                  <HiOutlineMail className="text-yellow-500 text-xl" />
                  <strong>البريد الإلكتروني</strong>
                </li>
                <li className="flex items-center gap-3">
                  <HiOutlineMail className="text-yellow-500 text-xl" />
                  <strong>اسم الدورة</strong>
                </li>
              </ul>
            </div>
          </div>

          {/* Step 4 */}
          <div className="flex items-center gap-4 justify-start">
            <div className="w-12 h-12 flex items-center justify-center bg-yellow-500 text-white rounded-full shadow-md">
              <span>4</span>
            </div>
            <p>
              بعد تأكيد الدفع، ستتمكن من الوصول إلى الدورة على الموقع بكل سهولة.
            </p>
          </div>
        </div>

        {/* Call to Action */}
        <div className="mt-10 flex justify-center">
          <button
            onClick={() => router.push("/")}
            className="relative bg-gradient-to-r from-yellow-600 to-yellow-400 text-white font-bold py-3 px-8 rounded-full shadow-lg hover:shadow-2xl hover:scale-105 focus:ring-4 focus:ring-yellow-300 dark:focus:ring-yellow-800 transition-all duration-300"
          >
            العودة إلى الصفحة الرئيسية
          </button>
        </div>
      </div>
    </div>
  );
};

export default PaymentInstructionsPage;
