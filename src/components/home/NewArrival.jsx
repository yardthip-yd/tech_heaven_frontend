import React, { useRef, useEffect } from "react";
import useProductStore from "@/stores/productStore";
import useCartStore from "@/stores/cartStore";
import ProductCard from "@/components/product/ProductCard";
import pyramidImg from "@/assets/image/pyramid.png";
import noodleImg from "@/assets/image/noodle.png";
import { motion, useScroll, useTransform } from "framer-motion";

const NewArrival = () => {
  const { products, actionGetAllProducts } = useProductStore();
  const addToCart = useCartStore((state) => state.addToCart);
  const sectionRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const pyramidY = useTransform(scrollYProgress, [0, 1], [0, -200]);
  const pyramidRotate = useTransform(scrollYProgress, [0, 1], [0, 45]);
  const pyramidScale = useTransform(scrollYProgress, [0, 1], [1, 1.2]);

  const noodleY = useTransform(scrollYProgress, [0, 1], [0, 200]);
  const noodleRotate = useTransform(scrollYProgress, [0, 1], [0, -45]);
  const noodleScale = useTransform(scrollYProgress, [0, 1], [1, 0.8]);

  const titleY = useTransform(scrollYProgress, [0, 1], [0, 100]);
  const titleOpacity = useTransform(scrollYProgress, [0, 0.5, 1], [1, 0.8, 0.6]);

  const bgCircle1Y = useTransform(scrollYProgress, [0, 1], [0, -50]);
  const bgCircle2Y = useTransform(scrollYProgress, [0, 1], [0, 50]);

  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    show: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        bounce: 0.4
      }
    }
  };

  useEffect(() => {
    actionGetAllProducts();
  }, [actionGetAllProducts]);

  const sortedProducts = products?.length > 0
    ? [...products].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
    : [];

  return (
    <div
      ref={sectionRef}
      className="min-h-[500px] sm:min-h-[600px] md:min-h-[800px] lg:min-h-[900px] w-full bg-gradient-to-b from-white to-[#f8f9ff] py-8 sm:py-10 md:py-20 relative overflow-visible"
    >
      {/* Parallax Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          className="absolute top-6 sm:top-10 md:top-20 right-6 sm:right-10 md:right-20 w-16 sm:w-20 md:w-32 h-16 sm:h-20 md:h-32 bg-blue-500 rounded-full opacity-5"
          style={{ y: bgCircle1Y }}
        />
        <motion.div
          className="absolute bottom-6 sm:bottom-10 md:bottom-20 left-6 sm:left-10 md:left-20 w-20 sm:w-24 md:w-40 h-20 sm:h-24 md:h-40 bg-indigo-500 rounded-full opacity-5"
          style={{ y: bgCircle2Y }}
        />
      </div>

      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 md:px-8 relative">
        {/* Header Section */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
          className="text-center mb-8 sm:mb-10 md:mb-20"
        >
          <motion.p
            className="text-blue-600 font-semibold mb-2 sm:mb-3 md:mb-5 tracking-wider text-xs sm:text-sm md:text-base"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            DISCOVER WHAT'S NEW
          </motion.p>
          <motion.h1
            className="text-2xl sm:text-3xl md:text-5xl font-bold font-prompt bg-gradient-to-r from-black to-blue-600 bg-clip-text text-transparent"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
          >
            NEW ARRIVALS
          </motion.h1>
        </motion.div>

        {/* Products Grid */}
        <motion.div
          className="relative overflow-hidden w-full py-4 sm:py-5 md:py-6"
          style={{
            WebkitMaskImage: 'linear-gradient(to right, transparent, black 5%, black 95%, transparent)',
            maskImage: 'linear-gradient(to right, transparent, black 5%, black 95%, transparent)'
          }}
        >
          <motion.div
            className="flex gap-4 sm:gap-6 md:gap-8"
            animate={{ x: ["0%", "-50%"] }}
            whileHover={{ x: "0%" }}
            transition={{
              duration: 10,
              repeat: Infinity,
              ease: "linear",
              repeatType: "loop"
            }}
          >
            {sortedProducts.concat(sortedProducts).map((product, index) => (
              <div
                key={`${product.id}-${index}`}
                className="flex-shrink-0 w-[272px] sm:w-[272px] md:w-[272px] lg:w-[272px] transform transition-all duration-300 hover:scale-105 shadow-lg"
              >
                <ProductCard
                  product={product}
                  onAddToCart={() => addToCart({ ...product, quantity: 1 })}
                />
              </div>
            ))}
          </motion.div>
        </motion.div>
      </div>

      {/* Parallax Decorative Images */}
      <motion.div
        className="absolute w-12 sm:w-24 md:w-32 lg:w-44 h-20 sm:h-24 md:h-32 lg:h-44 top-[400px] sm:top-[460px] md:top-[660px] -right-[20px] sm:-right-[30px] md:-right-[50px] z-10"
        style={{
          y: pyramidY,
          rotate: pyramidRotate,
          scale: pyramidScale,
        }}
      >
        <img
          src={pyramidImg}
          alt="Pyramid"
          className="w-full h-full object-contain opacity-80"
        />
      </motion.div>

      <motion.div
        className="absolute w-12 sm:w-24 md:w-32 lg:w-40 h-20 sm:h-24 md:h-32 lg:h-40 -top-[10px] sm:-top-[20px] md:-top-[30px] left-[10px] sm:left-[20px] md:left-[30px] z-10"
        style={{
          y: noodleY,
          rotate: noodleRotate,
          scale: noodleScale,
        }}
      >
        <img
          src={noodleImg}
          alt="Noodle"
          className="w-full h-full object-contain opacity-80"
        />
      </motion.div>
    </div>
  );
};

export default NewArrival;
