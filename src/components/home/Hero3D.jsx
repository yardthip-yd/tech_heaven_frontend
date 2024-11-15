import React, { useRef } from "react";
import { ArrowRight, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";
import Hero3DVideo from "@/assets/video/interactive-ai-startup-hero-page-cut2.mp4";
import tubeImg from "@/assets/image/tube.png";
import cubeImg from "@/assets/image/cube.avif";
import { motion, useScroll, useTransform } from "framer-motion";

const Hero3D = () => {
    const containerRef = useRef(null);
    const { scrollY } = useScroll();

    // Transform values
    const tubeY = useTransform(scrollY, [0, 1000], [0, -200]);
    const tubeRotate = useTransform(scrollY, [0, 1000], [0, 45]);
    const cubeY = useTransform(scrollY, [0, 1000], [0, 200]);
    const cubeRotate = useTransform(scrollY, [0, 1000], [0, -45]);

    // Animation variants
    const titleVariants = {
        hidden: { opacity: 0, y: 100 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 1,
                ease: "easeOut"
            }
        }
    };

    const subtitleVariants = {
        hidden: { opacity: 0, y: 50 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.8,
                delay: 0.5,
                ease: "easeOut"
            }
        }
    };

    const buttonVariants = {
        hidden: { opacity: 0, y: 30 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.6,
                delay: 1,
                ease: "easeOut"
            }
        }
    };

    return (
        <div ref={containerRef} className="relative w-full h-[400px] sm:h-[400px] md:h-[800px] lg:h-[800px] xl:h-[800px] overflow-visible bg-[#edf6ff]">

            {/* Background Video */}
            <video
                className="absolute inset-0 w-full h-full object-cover md:object-center object-left"
                src={Hero3DVideo}
                autoPlay
                loop
                muted
                playsInline
            />

            {/* Main Content */}
            <div className="relative z-20 flex flex-col m-auto justify-center h-full gap-4 max-w-[1440px] px-4 sm:px-8 text-center md:text-left">
                {/* Welcome Badge */}
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, ease: "easeOut" }}
                >
                    <div className="inline-flex items-center gap-2 backdrop-blur-sm px-3 sm:px-4 py-2 rounded-full border border-blue-600">
                        <Sparkles className="w-4 h-4 text-blue-500" />
                        <span className="text-xs sm:text-sm font-medium text-blue-600">Welcome to Tech Heaven</span>
                    </div>
                </motion.div>

                {/* Main Title */}
                <motion.div
                    variants={titleVariants}
                    initial="hidden"
                    animate="visible"
                    className="flex flex-col items-center md:items-start"
                >
                    <h1 className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-extrabold font-jost bg-gradient-to-b from-black to-blue-500 text-transparent bg-clip-text">
                        <span>TECH</span>
                        <br />
                        <span>HEAVEN</span>
                    </h1>
                </motion.div>

                {/* Subtitle */}
                <motion.div
                    variants={subtitleVariants}
                    initial="hidden"
                    animate="visible"
                    className="max-w-md sm:max-w-lg md:max-w-xl"
                >
                    <p className="text-base sm:text-lg md:text-2xl lg:text-3xl leading-relaxed font-prompt">
                        ตอบโจทย์ทุกไลฟ์สไตล์ทั้งทำงาน และเล่นเกม<br />
                        กับอุปกรณ์ IT ชั้นนำที่นี่!
                    </p>
                </motion.div>

                {/* CTA Button */}
                <motion.div
                    variants={buttonVariants}
                    initial="hidden"
                    animate="visible"
                >
                    <Link
                        to="/store"
                        className="group relative inline-flex items-center overflow-hidden bg-black px-5 sm:px-6 py-2 sm:py-3 md:px-8 md:py-4 rounded-lg"
                    >
                        <span className="relative flex items-center gap-2 text-white text-sm sm:text-base font-semibold">
                            <span>SHOP NOW</span>
                            <ArrowRight className="transition-transform duration-300 group-hover:translate-x-1" />
                        </span>
                    </Link>
                </motion.div>
            </div>

            {/* Parallax Images */}
            <motion.div
                style={{
                    y: tubeY,
                    rotate: tubeRotate,
                }}
                className="absolute w-16 h-16 sm:w-20 sm:h-20 md:w-44 md:h-44 top-[360px] sm:top-[500px] md:top-[600px] lg:top-[700px] right-[5px] z-10 will-change-transform"
            >
                <img
                    src={tubeImg}
                    alt="Tube"
                    className="w-full h-full object-contain drop-shadow-2xl"
                />
            </motion.div>

            <motion.div
                style={{
                    y: cubeY,
                    rotate: cubeRotate,
                }}
                className="absolute w-12 h-12 sm:w-16 sm:h-16 md:w-40 md:h-40 top-10 sm:top-10 md:-top-[30px] -left-[20px] md:-left-[50px] z-10 will-change-transform"
            >
                <img
                    src={cubeImg}
                    alt="Cube"
                    className="w-full h-full object-contain drop-shadow-2xl"
                />
            </motion.div>

            {/* Floating Light Effects */}
            <div className="absolute top-1/4 left-1/4 w-24 h-24 sm:w-32 sm:h-32 md:w-48 md:h-48 lg:w-64 lg:h-64 bg-blue-500/20 rounded-full blur-3xl" />
            <div className="absolute bottom-1/4 right-1/4 w-24 h-24 sm:w-32 sm:h-32 md:w-48 md:h-48 lg:w-64 lg:h-64 bg-indigo-500/20 rounded-full blur-3xl" />
        </div>
    );
}

export default Hero3D;
