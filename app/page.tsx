
import ReviewsSlider from "@/components/ReviewsSlider";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowDownIcon } from "lucide-react";
import React, { useState } from "react";

import FeaturesSection from "@/components/FeaturesSection"
import Hero from "@/components/Hero";
import About from "@/components/About";
import StudyingSteps from "@/components/Studying-steps";
import Fqs from "@/components/fqs";
import Footer from "@/components/Footer";
import NavBar from "@/components/navBar";
import DetailSection from "@/components/DetailSection";

import "aos/dist/aos.css";
import { useEffect } from "react";
import AOS from "aos";
import ModulesSection from "@/components/ModulesSection";
import Courses from "@/components/Courses";
import ShadowCursor from "@/components/ShadowCursor";
import Review from "@/components/Reviews";


const Header = () => {

    return (
        <div>
            <div className="bg-[url('/bg1.svg')] bg-cover bg-center">
                <NavBar />
                <Hero />
            </div>
            <section className="overflow-hidden">
                <About />
                <DetailSection/>
                <ModulesSection/>
                <Courses/>
                <FeaturesSection />
                <StudyingSteps />
                <Fqs />
                <Review/>
            </section>
            <Footer />
        </div>

    );
};

export default Header;
