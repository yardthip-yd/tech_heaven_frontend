import React, { useEffect, useState, useRef } from "react";
import useProductStore from "@/stores/productStore";
import ProductCard from "@/components/product/ProductCard";
import FiltersSidebar from "@/components/product/FilterSidebar";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { motion, useScroll, useTransform } from "framer-motion";
import { Search } from "lucide-react";
import circleImg from "@/assets/image/circle.avif";
import flowerImg from "@/assets/image/flower.avif";
import noodleImg from "@/assets/image/noodle.png";
import cubeImg from "@/assets/image/cube.avif";
import tubeImg from "@/assets/image/tube.png";
import starImg from "@/assets/image/star.png";
import pyramidImg from "@/assets/image/pyramid.png";

const Store = () => {
  const { products, actionGetAllProducts } = useProductStore();
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [category, setCategory] = useState([]);
  const [categories, setCategories] = useState([]);
  const [sortType, setSortType] = useState("low-high");
  const [priceRange, setPriceRange] = useState([0, 0]);
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(0);
  const [productsToShow, setProductsToShow] = useState(20);
  const [isFetchingMore, setIsFetchingMore] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const observerRef = useRef(null);

  const sectionRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: sectionRef });
  const bgCircle1Y = useTransform(scrollYProgress, [0, 1], [0, -50]);
  const bgCircle2Y = useTransform(scrollYProgress, [0, 1], [0, 50]);

  const { scrollY } = useScroll();

  // Transform values
  const circleY = useTransform(scrollY, [0, 1000], [0, -200]);
  const circleRotate = useTransform(scrollY, [0, 1000], [0, 45]);
  const flowerY = useTransform(scrollY, [0, 1000], [0, 200]);
  const flowerRotate = useTransform(scrollY, [0, 1000], [0, -45]);
  const noodleY = useTransform(scrollYProgress, [0, 1], [0, 200]);
  const noodleScale = useTransform(scrollYProgress, [0, 1], [1, 0.8]);
  const cubeY = useTransform(scrollY, [0, 1000], [0, 200]);
  const cubeRotate = useTransform(scrollY, [0, 1000], [0, -45]);
  const tubeY = useTransform(scrollY, [0, 1000], [0, -200]);
  const starY = useTransform(scrollY, [0, 1000], [0, -200]);
  const pyramidY = useTransform(scrollYProgress, [0, 1], [0, -200]);
  const pyramidScale = useTransform(scrollYProgress, [0, 1], [1, 1.2]);

  useEffect(() => {
    actionGetAllProducts(1000);
  }, [actionGetAllProducts]);

  useEffect(() => {
    if (products.length > 0) {
      const prices = products.map((product) => product.price);
      setMinPrice(Math.min(...prices));
      setMaxPrice(Math.max(...prices));
      setPriceRange([Math.min(...prices), Math.max(...prices)]);
    }
  }, [products]);

  useEffect(() => {
    const uniqueCategories = [
      ...new Set(products.map((product) => product.ProductCategory?.name)),
    ];
    setCategories(uniqueCategories);
  }, [products]);

  useEffect(() => {
    applyFiltersAndSort();
  }, [category, sortType, products, priceRange, searchTerm]);

  const toggleCategory = (value) => {
    setCategory((prev) =>
      prev.includes(value)
        ? prev.filter((item) => item !== value)
        : [...prev, value]
    );
  };

  const clearCategory = () => {
    setCategory([]);
  };

  const applyFiltersAndSort = () => {
    let filtered = products;

    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter((product) =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Filter by category
    if (category.length > 0) {
      filtered = filtered.filter((item) =>
        category.includes(item.ProductCategory?.name)
      );
    }

    // Filter by price range
    filtered = filtered.filter(
      (item) => item.price >= priceRange[0] && item.price <= priceRange[1]
    );

    // Sort products
    if (sortType === "low-high") {
      filtered.sort((a, b) => a.price - b.price);
    } else if (sortType === "high-low") {
      filtered.sort((a, b) => b.price - a.price);
    }

    setFilteredProducts(filtered);
  };

  const loadMoreProducts = () => {
    if (productsToShow >= filteredProducts.length) return;
    setIsFetchingMore(true);
    setTimeout(() => {
      setProductsToShow((prev) => Math.min(prev + 20, filteredProducts.length));
      setIsFetchingMore(false);
    }, 500);
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !isFetchingMore) {
          loadMoreProducts();
        }
      },
      { threshold: 1.0 }
    );

    if (observerRef.current) observer.observe(observerRef.current);
    return () => observer.disconnect();
  }, [isFetchingMore, filteredProducts]);

  return (
    <div
      ref={sectionRef}
      className="relative w-full bg-gradient-to-b from-white to-[#f8f9ff] py-8"
    >
      {/* Floating Light Effects */}
      <motion.div
        className="absolute top-1/4 left-1/4 w-64 h-64 bg-blue-500/20 rounded-full blur-3xl z-0"
        style={{ y: bgCircle1Y }}
      />
      <motion.div
        className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-indigo-500/20 rounded-full blur-3xl z-0"
        style={{ y: bgCircle2Y }}
      />

      <div className="max-w-[1440px] mx-auto px-4 py-8">
        {/* Search Bar */}
        <div className="flex items-center justify-center mb-20 relative w-full lg:w-1/2 mx-auto">
          <Search className="absolute left-4 text-slate-400 h-5 w-5" />
          <input
            type="text"
            placeholder="Search products..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full px-10 py-2 rounded-lg border border-gray-300 shadow-sm"
          />
        </div>

        <div className="flex flex-col lg:flex-row gap-6">
          {/* Filters Sidebar */}
          <div className="w-full lg:w-[280px] relative z-10">
            <FiltersSidebar
              categories={categories}
              category={category}
              toggleCategory={toggleCategory}
              clearCategory={clearCategory}
              minPrice={minPrice}
              maxPrice={maxPrice}
              priceRange={priceRange}
              setPriceRange={setPriceRange}
            />
          </div>

          {/* Products Section */}
          <div className="flex-1">
            {/* Header and Sort */}
            <div className="flex justify-between">
              <h2 className="text-3xl font-bold bg-gradient-to-r from-black via-blue-600 to-indigo-600 bg-clip-text text-transparent">
                ALL PRODUCTS
              </h2>
              <div className="flex items-center gap-2">
                <span className="text-slate-600 text-sm">Sort by:</span>
                <Select value={sortType} onValueChange={setSortType}>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Sort by price" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="low-high">Price: Low to High</SelectItem>
                    <SelectItem value="high-low">Price: High to Low</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Products Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mt-4 relative z-10">
              {filteredProducts.slice(0, productsToShow).map((product) => (
                <div key={product.id} className="shadow-lg relative z-10">
                  <ProductCard key={product.id} product={product} />
                </div>
              ))}
            </div>

            {isFetchingMore && (
              <div className="text-center mt-4">
                <p className="text-blue-600">Loading more products...</p>
              </div>
            )}
            <div ref={observerRef} className="h-1 mt-8"></div>

            {filteredProducts.length === 0 && (
              <div className="text-center py-12">
                <p className="text-slate-500">
                  No products found matching your criteria.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Parallax Images */}
      <motion.div
        style={{
          y: circleY,
          rotate: circleRotate,
        }}
        className="absolute w-28 h-28 top-[700px] right-[80px] z-10 will-change-transform"
      >
        <img
          src={circleImg}
          alt="Circle"
          className="w-full h-full object-contain drop-shadow-2xl"
        />
      </motion.div>

      <motion.div
        className="absolute w-20 h-20 top-[20px] -right-[5px] z-10"
        style={{
          y: pyramidY,
          rotate: 120,
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
        style={{
          y: flowerY,
          rotate: flowerRotate,
        }}
        className="absolute w-24 h-24 top-[30px] left-[100px] z-10 will-change-transform"
      >
        <img
          src={flowerImg}
          alt="Flower"
          className="w-full h-full object-contain drop-shadow-2xl"
        />
      </motion.div>

      <motion.div
        className="absolute w-40 h-40 top-[1600px] left-[300px] z-10"
        style={{
          y: noodleY,
          rotate: 120,
          scale: noodleScale,
        }}
      >
        <img
          src={noodleImg}
          alt="Noodle"
          className="w-full h-full object-contain opacity-80"
        />
      </motion.div>

      <motion.div
        style={{
          y: cubeY,
          rotate: cubeRotate,
        }}
        className="absolute w-40 h-40 top-[2700px] -right-[50px] z-10 will-change-transform"
      >
        <img
          src={cubeImg}
          alt="Cube"
          className="w-full h-full object-contain drop-shadow-2xl"
        />
      </motion.div>

      <motion.div
        style={{
          y: tubeY,
          rotate: 270,
        }}
        className="absolute w-52 h-52 top-[3500px] left-[5px] z-10 will-change-transform"
      >
        <img
          src={tubeImg}
          alt="Tube"
          className="w-full h-full object-contain drop-shadow-2xl"
        />
      </motion.div>

      <motion.div
        style={{
          y: starY,
          rotate: 270,
        }}
        className="absolute w-28 h-28 top-[4400px] right-[220px] z-10 will-change-transform"
      >
        <img
          src={starImg}
          alt="Star"
          className="w-full h-full object-contain drop-shadow-2xl"
        />
      </motion.div>
    </div>
  );
};

export default Store;
