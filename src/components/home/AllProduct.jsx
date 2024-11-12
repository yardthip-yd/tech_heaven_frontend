import React, { useEffect, useState, useRef } from "react";
import useProductStore from "@/stores/productStore";
import ProductCard from "@/components/product/ProductCard";
import { useNavigate } from "react-router-dom";
import { motion, useScroll, useTransform } from "framer-motion";
import { ChevronRight, Sparkles } from "lucide-react";

const AllProduct = () => {
  const { products, actionGetAllProducts } = useProductStore();
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [category, setCategory] = useState([]);
  const [categories, setCategories] = useState([]);
  const [sortType, setSortType] = useState("low-high");
  const sectionRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    actionGetAllProducts();
  }, [actionGetAllProducts]);

  useEffect(() => {
    setFilteredProducts(products);
    const uniqueCategories = [
      ...new Set(products.map((product) => product.ProductCategory?.name)),
    ];
    setCategories(uniqueCategories);
  }, [products]);

  const truncateText = (text, maxLength) => {
    if (text.length > maxLength) {
      return text.slice(0, maxLength) + "...";
    }
    return text;
  };
  const handleAddToCart = (product) => {
    const itemToAdd = {
      userId: currentUser ? currentUser.id : "guest",
      productId: product.id,
      quantity: 1,
    };
    console.log(itemToAdd, "item");
    actionAddToCart(itemToAdd);
  };

  // Function to handle card click
  const handleCardClick = (productId) => {
    navigate(`/product/${productId}`);
    console.log("product ID from all product", productId);
  };
  const handleViewAllClick = () => {
    navigate("/store");
  };

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

  return (
    <div className="min-h-[420px] w-full max-w-[1600px] flex flex-col mx-auto pt-8">

      <div className="max-w-[1440px] mx-auto px-8">
        {/* Header Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-14"
        >
          <div className="inline-flex items-end justify-center gap-2 bg-blue-50 px-4 py-2 rounded-full mb-6">
            <Sparkles className="w-4 h-4 text-blue-500" />
            <span className="text-sm font-medium text-blue-600">Explore Our Collection</span>
          </div>

          <h2 className="text-5xl font-bold font-prompt bg-gradient-to-r from-black via-blue-600 to-indigo-600 bg-clip-text text-transparent mb-6">
            ALL PRODUCTS
          </h2>
          <p className="text-slate-600 text-lg max-w-2xl mx-auto">
            Discover our curated selection of premium tech products
          </p>
        </motion.div>

       {/* View All Button */}
       <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="flex justify-end"
        >
          <button
            onClick={() => navigate("/store")}
            className="group flex items-center gap-2 px-4 py-2 bg-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 mb-4"
          >
            <span className="text-blue-600 font-medium">View All Products</span>
            <ChevronRight className="w-5 h-5 text-blue-600 transition-transform duration-300 group-hover:translate-x-1" />
          </button>
        </motion.div>

        {/* Products Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.1 }}
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-8"
        >
          {filteredProducts.slice(0, 15).map((product) => (
            <motion.div
              key={product.id}
              variants={itemVariants}
              className="group flex justify-center"
            >
              <div className="w-[272px] bg-white rounded-lg shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 flex">
              <div
                key={`${product.id}`}
                className="flex-shrink-0 w-[272px] transform transition-all duration-300 hover:scale-105 shadow-lg"
              >
                  <ProductCard key={product.id} product={product} />
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Bottom Decoration */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 1 }}
          className="mt-20 flex justify-center"
        >
          <div className="w-32 h-1 bg-gradient-to-r from-transparent via-slate-200 to-transparent rounded-full" />
        </motion.div>
      </div>
    </div>
  );
};

export default AllProduct;
