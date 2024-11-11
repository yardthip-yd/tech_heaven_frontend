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

  // Define all transforms at the top
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
      className="min-h-[800px] w-full bg-gradient-to-b from-white to-[#f8f9ff] py-20 relative overflow-hidden"
    >
      {/* Parallax Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          className="absolute top-20 right-20 w-32 h-32 bg-blue-500 rounded-full opacity-5"
          style={{ y: bgCircle1Y }}
        />
        <motion.div
          className="absolute bottom-20 left-20 w-40 h-40 bg-indigo-500 rounded-full opacity-5"
          style={{ y: bgCircle2Y }}
        />
      </div>

      <div className="max-w-[1440px] mx-auto px-8 relative">
        {/* Header Section */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
          className="text-center mb-20"
        >
          <motion.p
            className="text-blue-600 font-semibold mb-5 tracking-wider"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            DISCOVER WHAT'S NEW
          </motion.p>
          <motion.h1
            className="text-5xl font-bold font-prompt bg-gradient-to-r from-black to-blue-600 bg-clip-text text-transparent"
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
          className="relative overflow-hidden w-full py-6"
          style={{
            WebkitMaskImage: 'linear-gradient(to right, transparent, black 5%, black 95%, transparent)',
            maskImage: 'linear-gradient(to right, transparent, black 5%, black 95%, transparent)'
          }}
        >
          <motion.div
            className="flex gap-8"
            animate={{ x: ["0%", "-50%"] }}
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
                className="flex-shrink-0 w-[272px] transform transition-all duration-300 hover:scale-105 shadow-lg"
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
        className="absolute w-44 h-44 top-[660px] -right-[50px] z-10"
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
        className="absolute w-40 h-40 -top-[30px] left-[30px] z-10"
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