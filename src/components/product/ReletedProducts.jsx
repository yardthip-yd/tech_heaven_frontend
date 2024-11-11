import React from "react";
import ProductCard from "@/components/product/ProductCard";
import { motion } from "framer-motion";

const RelatedProducts = ({ relatedProducts }) => {
  return (
    <div className="w-full mt-8">
      <h2 className="text-xl font-bold mb-4">RELATED PRODUCTS</h2>
      <div
        className="overflow-hidden w-full py-6"
        style={{
          WebkitMaskImage:
            "linear-gradient(to right, transparent, black 10%, black 90%, transparent)",
          maskImage:
            "linear-gradient(to right, transparent, black 10%, black 90%, transparent)",
        }}
      >
        <motion.div
          className="flex space-x-0 gap-8"
          animate={{ x: ["0%", "-100%"] }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear",
            repeatType: "loop",
          }}
        >
          {relatedProducts.map((product) => (
            <div
              key={product.id}
              className="flex-shrink-0 w-[272px] shadow-lg rounded-2xl"
            >
              <ProductCard product={product} />
            </div>
          ))}
        </motion.div>
      </div>
    </div>
  );
};

export default RelatedProducts;
