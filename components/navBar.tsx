'use client';
import { useAuth, UserButton } from "@clerk/nextjs";
import Link from "next/link";
import { useCallback, useState } from "react";
import { FaBars, FaTimes } from "react-icons/fa";

const Nav_Bar = () => {
    const [sidebarOpen, setSidebarOpen] = useState(false);

    const toggleSidebar = useCallback(() => {
        setSidebarOpen((prev) => !prev);
    }, []);

    const { userId } = useAuth();

    return (
        <div>
            <header className="container mx-auto px-6 py-4 flex items-center justify-between">
                {/* Logo Section */}
                <div className="flex items-center">
                    <Link href="/" className="flex items-center">
                        <img
                            src="/images/logo1.jpg"
                            alt="afaq Academy"
                            className="h-12 sm:h-20"
                        />
                    </Link>
                </div>

                {/* Desktop Navigation */}
                <nav className="hidden lg:flex items-center space-x-6">
                    <Link
                        href="#Footer"
                        className="text-brown font-bold text-lg hover:text-yellow-600 transition"
                    >
                        تواصلو معنا
                    </Link>
                    <Link
                        href="/profs"
                        className="text-brown font-bold text-lg hover:text-yellow-600 transition"
                    >
                        أساتذتنا 
                    </Link>
                    <Link
                        href="/search"
                        className="text-brown font-bold text-lg hover:text-yellow-600 transition"
                    >
                        الدورات
                    </Link>
                    <Link
                        href="/#about"
                        className="text-brown font-bold text-lg hover:text-yellow-600 transition"
                    >
                        عن المشروع
                    </Link>
                    <Link
                        href="/"
                        className="text-brown font-bold text-lg hover:text-yellow-600 transition"
                    >
                        الرئيسية
                    </Link>
                </nav>

                {/* User Actions or Auth Links */}
                <div className="flex items-center space-x-4">
                    {userId ? (
                        <div className="flex items-center space-x-4">
                            <UserButton
                                afterSignOutUrl="/"
                                appearance={{
                                    elements: {
                                        avatarBox: {
                                            width: "50px",
                                            height: "50px",
                                        },
                                    },
                                }}
                            />
                            <p className="hidden sm:block text-brown font-medium">حساب المستخدم</p>
                        </div>
                    ) : (
                        <div className="flex flex-col sm:flex-row gap-4 sm:gap-0 justify-center space-x-4 items-center">
                            <Link
                                href="/sign-in"
                                className="text-gold text-sm sm:text-lg font-bold"
                            >
                                تسجيل الدخول
                            </Link>
                            <Link
                                href="/sign-up"
                                className="text-white text-sm sm:text-lg font-bold px-4 py-2 rounded-full bg-gradient-to-r from-[#D6A959] to-[#54371B] hover:opacity-90"
                            >
                                انشاء حساب
                            </Link>
                        </div>
                    )}
                </div>

                {/* Mobile Sidebar Toggle Button */}
                <div className="lg:hidden">
                    <button
                        onClick={toggleSidebar}
                        className="cursor-pointer"
                        aria-label="Toggle Sidebar"
                    >
                        <FaBars className="text-gold" size={30} />
                    </button>
                </div>
            </header>

            {/* Mobile Sidebar */}
            <aside
                className={`fixed top-0 left-0 h-full w-64 bg-gray-50 p-4 transform z-50 ${
                    sidebarOpen ? "translate-x-0" : "-translate-x-full"
                } transition-transform duration-300 ease-in-out lg:hidden`}
            >
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-lg font-bold text-gold">القائمة</h2>
                    <button
                        onClick={toggleSidebar}
                        className="cursor-pointer text-gold"
                        aria-label="Close Sidebar"
                    >
                        <FaTimes size={30} />
                    </button>
                </div>
                <ul className="space-y-4">
                    {[{
                        name: "الصفحة الرئيسية",
                        link: "/"
                    }, {
                        name: "عن المشروع",
                        link: "/#about"
                    }, {
                        name: "الدورات",
                        link: "/search"
                    }, {
                        name: "أساتذتنا ",
                        link: "/profs"
                    }, {
                        name: "تواصلو معنا",
                        link: "#Footer"
                    }].map((item, index) => (
                        <li key={index}>
                            <Link
                                href={item.link}
                                className="text-brown font-medium hover:text-yellow-600"
                                onClick={toggleSidebar}
                            >
                                {item.name}
                            </Link>
                        </li>
                    ))}
                </ul>
            </aside>
        </div>
    );
};

export default Nav_Bar;