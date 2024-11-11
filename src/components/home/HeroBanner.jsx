import React, { useEffect, useState } from "react";
import HeroData from "./HeroData";
import { motion, AnimatePresence, easeInOut } from "framer-motion";
import SlideRight from "./HeroAnimation";
import { Link } from "react-router-dom";

const HeroBanner = () => {
  const [activeHeroData, setActiveHeroData] = useState(HeroData[0]);
  const [currentIdex, setCurrentIdex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIdex((prevIdex) => (prevIdex + 1) % HeroData.length);
    }, 3000);

    return () => clearInterval(interval);
  }, [currentIdex]);

  useEffect(() => {
    setActiveHeroData(HeroData[currentIdex]);
  }, [currentIdex]);

  return (
    <motion.div
      className="h-screen w-full flex items-center max-h-[500px] overflow-hidden"
      initial={{
        backgroundImage: `radial-gradient(circle, ${activeHeroData.bgColor} 0%, ${activeHeroData.bgColor} 0%)`,
      }}
      animate={{
        backgroundImage: `radial-gradient(circle, ${activeHeroData.bgColor}aa 0%, ${activeHeroData.bgColor} 100%)`,
      }}
      transition={{ duration: 0.8 }}
    >
      <div className="flex flex-row items-center justify-center mx-auto max-w-[2000px]">
        {/* product info section */}
        <div className=" text-white flex flex-col justify-center max-w-[800px] mx-10">
          <div className=" flex flex-col gap-6">
            <AnimatePresence mode="wait">
              <motion.p
                className="text-3xl font-bold"
                key={activeHeroData.id}
                variants={SlideRight(0.2)}
                initial="hidden"
                animate="show"
                exit="exit"
              >
                {activeHeroData.title}
              </motion.p>
            </AnimatePresence>
            <AnimatePresence mode="wait">
              <motion.p
                className="text-base"
                key={activeHeroData.id}
                variants={SlideRight(0.2)}
                initial="hidden"
                animate="show"
                exit="exit"
              >
                {activeHeroData.description}
              </motion.p>
            </AnimatePresence>
            <AnimatePresence mode="wait">
              <motion.p
                className="text-3xl font-bold"
                key={activeHeroData.id}
                variants={SlideRight(0.2)}
                initial="hidden"
                animate="show"
                exit="exit"
              >
                {activeHeroData.price}
              </motion.p>
            </AnimatePresence>
            <AnimatePresence mode="wait">
              <motion.div
                key={activeHeroData.id}
                variants={SlideRight(0.2)}
                initial="hidden"
                animate="show"
                exit={"exit"}
              >
                <Link
                  to={activeHeroData.link}
                  className="bg-gradient-to-r from-blue-500 to-indigo-500 text-white px-6 py-4 rounded-xl w-full"
                >
                  Buy Now
                </Link>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        {/* product image section */}
        <div className="flex flex-col items-center relative">
          <AnimatePresence mode="wait">
            <motion.img
              src={activeHeroData.image}
              className="min-h-[200px] max-h-[350px]"
              key={activeHeroData.id}
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -100 }}
              transition={{ duration: 0.4, ease: easeInOut, delay: 0 }}
            />
          </AnimatePresence>
          <AnimatePresence mode="wait">
            <motion.div
              className="text-[300px] text-white/5 absolute top-0 -z-9 -translate-x-1.5 -translate-y-1/2 font-extrabold"
              key={activeHeroData.id}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4, ease: easeInOut, delay: 0 }}
            >
              {activeHeroData.modal}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </motion.div>
  );
};

export default HeroBanner;
