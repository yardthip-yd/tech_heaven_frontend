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
        <div ref={containerRef} className="relative h-[800px] w-screen bg-[#edf6ff] overflow-visible">

            {/* Background Video */}
            <video
                className="absolute object-cover m-auto h-full w-full inset-0"
                src={Hero3DVideo}
                autoPlay
                loop
                muted
            />

            {/* Main Content */}
            <div className="relative z-20 flex flex-col m-auto justify-center h-full gap-4 max-w-[1440px] px-8">
                {/* Welcome Badge */}
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, ease: "easeOut" }}
                >
                    <div className="inline-flex items-center gap-2 backdrop-blur-sm px-4 py-2 rounded-full border border-blue-600">
                        <Sparkles className="w-4 h-4 text-blue-500" />
                        <span className="text-sm font-medium text-blue-600">Welcome to Tech Heaven</span>
                    </div>
                </motion.div>

                {/* Main Title */}
                <motion.div
                    variants={titleVariants}
                    initial="hidden"
                    animate="visible"
                    className="flex flex-col items-start"
                >
                    <h1 className="text-8xl font-extrabold font-jost bg-gradient-to-b from-black to-blue-500 text-transparent bg-clip-text">
                        <span>
                            TECH
                        </span>
                        <br />
                        <span>
                            HEAVEN
                        </span>
                    </h1>
                </motion.div>

                {/* Subtitle */}
                <motion.div
                    variants={subtitleVariants}
                    initial="hidden"
                    animate="visible"
                    className="max-w-2xl"
                >
                    <p className="text-3xl leading-relaxed font-prompt">
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
                        className="group relative inline-flex items-center overflow-hidden bg-black px-8 py-4 rounded-lg"
                    >
                        <span className="relative flex items-center gap-2 text-white font-semibold">
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
                className="absolute w-44 h-44 top-[700px] right-[5px] z-10 will-change-transform"
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
                className="absolute w-40 h-40 -top-[30px] -left-[50px] z-10 will-change-transform"
            >
                <img
                    src={cubeImg}
                    alt="Cube"
                    className="w-full h-full object-contain drop-shadow-2xl"
                />
            </motion.div>

            {/* Decorative Elements */}
            <div className="absolute inset-0 bg-[url('/grid.png')] opacity-30 z-[5]" />
            <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-black/50 to-transparent z-[5]" />

            {/* Floating Light Effects */}
            <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-blue-500/20 rounded-full blur-3xl" />
            <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-indigo-500/20 rounded-full blur-3xl" />
        </div>
    );
}

export default Hero3D