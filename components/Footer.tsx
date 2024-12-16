import { Facebook, Instagram, Twitter } from "lucide-react";
import Link from "next/link";
import { BsTiktok } from "react-icons/bs";
import { FaTiktok } from "react-icons/fa";

const Footer = () => {
    return (

        <footer id="Footer" className=" text-white py-10 bg-[url('/bg3.svg')] bg-cover bg-center  relative">
            {/* Container */}
            <div className="container mx-auto px-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">

                    {/* Middle Section */}
                    <div className="flex flex-col space-y-4 text-center">
                        <h3 className="text-yellow-500 font-bold">عن برنامج أكاديمية آفاق</h3>
                        <ul className="space-y-2 text-sm">
                            <li>
                                <Link href="#" className="hover:text-yellow-400">
                                    الرئيسية
                                </Link>
                            </li>
                            <li>
                                <Link href="#" className="hover:text-yellow-400">
                                    أساتذتنا
                                </Link>
                            </li>
                            <li>
                                <Link href="#" className="hover:text-yellow-400">
                                    عن المشروع
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Right Section */}
                    <div className="flex flex-col space-y-4 text-center">
                        <h3 className="text-yellow-500 font-bold">المزيد</h3>
                        <ul className="space-y-2 text-sm">
                            <li>
                                <Link href="#" className="hover:text-yellow-400">
                                    سياسة الخصوصية
                                </Link>
                            </li>
                            <li>
                                <Link href="#" className="hover:text-yellow-400">
                                    القواعد و الشروط
                                </Link>
                            </li>
                            <li>
                                <p className="text-[20px] py-4">
                                معلومات التواصل  
                                </p>
                                <a href="mailto:afaqacademie@gmail.com" className="text-[20px] pb-2 text-yellow-400">
                                afaqacademie@gmail.com   
                                </a>
                                <p className="text-[20px] text-yellow-400">
                                05.62.12.10.74   
                                </p>
                            </li>
                        </ul>
                    </div>

                    {/* Left Section */}
                    <div className="flex flex-col space-y-4">
                        <img
                            src="/images/logo.png" // Replace with your logo path
                            alt="Zad Academy Logo"
                            className="h-24"
                        />
                        <p className="text-sm leading-relaxed text-end">
                            آفاق ليست مجرد منصة تعليمية، بل شريكك لتحقيق التفوق والتميز. انضم إلينا الآن واستعد لمستقبل مشرق!                            </p>
                    </div>
                </div>

                {/* Divider */}
                <div className="border-t border-gray-600 my-8"></div>

                {/* Bottom Section */}
                <div className="flex flex-col md:flex-row justify-around items-center space-y-4 md:space-y-0 text-end">
                    <p className="text-sm">
                        أكاديمية آفاق © 2024
                    </p>
                    <p className="text-sm">
                        معا نحو التفوق
                    </p>
                    <div className="flex space-x-4 justify-end">
                        <Link
                            href="#"
                            className="text-gray-400 hover:text-white transition duration-300"
                            aria-label="Telegram"
                        >
                            <img
                                src="/images/telegram.svg"
                                className="w-8 h-8"
                            />
                        </Link>
                        <Link
                            href="https://www.instagram.com/afaqaacademie?igsh=emxsaTJvc3hjaGRq"
                            className="text-gray-400 hover:text-white transition duration-300"
                            aria-label="instagram"
                        >
                            <img
                                src="/images/instagram.svg"
                                className="w-8 h-8"
                            />
                        </Link>
                        <Link
                            href="https://www.tiktok.com/@afaq_academie?is_from_webapp=1&sender_device=pc"
                            className="text-gray-400 hover:text-white transition duration-300"
                            aria-label="Instagram"
                        >
                            <img
                                src="/images/tiktok.svg"
                                className="w-8 h-8"
                            />
                        </Link>
                        <Link
                            href="#"
                            className="text-gray-400 hover:text-white transition duration-300"
                            aria-label="Facebook"
                        >
                            <img
                                src="/images/facebook.svg"
                                className="w-8 h-8"
                            />
                        </Link>
                    </div>
                </div>
            </div>
        </footer>
    );
}

export default Footer;