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
import { Search, Filter } from "lucide-react";
import circleImg from "@/assets/image/circle.avif";
import flowerImg from "@/assets/image/flower.avif";
import noodleImg from "@/assets/image/noodle.png";
import cubeImg from "@/assets/image/cube.avif";
import tubeImg from "@/assets/image/tube.png";
import starImg from "@/assets/image/star.png";
import pyramidImg from "@/assets/image/pyramid.png";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

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
  const [isFilterOpen, setIsFilterOpen] = useState(false);

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
  const noodleRotate = useTransform(scrollYProgress, [0, 1], [0, -45]);
  const noodleScale = useTransform(scrollYProgress, [0, 1], [1, 0.8]);
  const cubeY = useTransform(scrollY, [0, 1000], [0, 200]);
  const cubeRotate = useTransform(scrollY, [0, 1000], [0, -45]);
  const tubeY = useTransform(scrollY, [0, 1000], [0, -200]);
  const starY = useTransform(scrollY, [0, 1000], [0, -200]);
  const starRotate = useTransform(scrollY, [0, 1000], [0, 45]);
  const pyramidY = useTransform(scrollYProgress, [0, 1], [0, -200]);
  const pyramidRotate = useTransform(scrollY, [0, 1000], [0, 45]);
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
    <div ref={sectionRef} className="relative w-full bg-gradient-to-b from-white to-[#f8f9ff] py-4 sm:py-8">
      {/* Floating Light Effects */}
      <motion.div
        className="absolute top-1/4 left-1/4 w-32 sm:w-64 h-32 sm:h-64 bg-blue-500/20 rounded-full blur-3xl z-0"
        style={{ y: bgCircle1Y }}
      />
      <motion.div
        className="absolute bottom-1/4 right-1/4 w-32 sm:w-64 h-32 sm:h-64 bg-indigo-500/20 rounded-full blur-3xl z-0"
        style={{ y: bgCircle2Y }}
      />

      <div className="max-w-[1440px] mx-auto px-4 py-4 sm:py-8">
        {/* Search Bar */}
        <div className="flex items-center justify-center mb-8 sm:mb-12 relative w-full lg:w-1/2 mx-auto mt-12 md:mt-0">
          <Search className="absolute left-4 text-slate-400 h-4 sm:h-5 w-4 sm:w-5" />
          <input
            type="text"
            placeholder="Search products..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full px-10 py-2 text-sm sm:text-base rounded-lg border border-slate-300 shadow-sm"
          />
        </div>

        <div className="flex flex-col lg:flex-row gap-6">
          {/* Mobile Filter & Sort Section */}
          <div className="lg:hidden flex justify-between items-center mb-4">
            <h2 className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-black via-blue-600 to-indigo-600 bg-clip-text text-transparent">
              ALL PRODUCTS
            </h2>
            <div className="flex items-center gap-2">
              {/* Filter Button */}
              <Sheet open={isFilterOpen} onOpenChange={setIsFilterOpen}>
                <SheetTrigger className="flex items-center gap-2 px-2 py-2 border rounded-lg">
                  <Filter className="h-4 w-4" />
                </SheetTrigger>
                <SheetContent side="left" className="w-[300px] sm:w-[380px]">
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
                </SheetContent>
              </Sheet>

              {/* Sort Dropdown */}
              <Select value={sortType} onValueChange={setSortType}>
                <SelectTrigger className="w-[160px] sm:w-[140px]">
                  <SelectValue placeholder="Sort" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="low-high">Price: Low to High</SelectItem>
                  <SelectItem value="high-low">Price: High to Low</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Desktop Filters Sidebar */}
          <div className="hidden lg:block w-[280px] relative z-10">
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
            {/* Desktop Header and Sort */}
            <div className="hidden lg:flex justify-between items-center">
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
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-4 sm:gap-6 mt-4 relative z-10">
              {filteredProducts.slice(0, productsToShow).map((product) => (
                <div key={product.id} className="mx-auto flex-shrink-0 w-[272px] sm:w-[272px] md:w-[272px] lg:w-[272px] transform transition-all duration-300 hover:scale-105 shadow-lg">
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
              <div className="text-center py-8 sm:py-12">
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
        style={{ y: circleY, rotate: circleRotate }}
        className="hidden sm:block absolute w-12 h-12 sm:w-16 sm:h-16 md:w-24 md:h-24 top-[600px] sm:top-[1030px] md:top-[1200px] right-[20px] sm:right-[40px] md:right-[80px] z-10 will-change-transform"
      >
        <img
          src={circleImg}
          alt="Circle"
          className="w-full h-full object-contain drop-shadow-2xl"
        />
      </motion.div>

      <motion.div
        className="hidden sm:block absolute w-12 h-12 sm:w-16 sm:h-16 md:w-20 md:h-20 top-[10px] sm:top-[20px] right-[10px] sm:right-[15px] z-10"
        style={{
          y: pyramidY,
          rotate: pyramidRotate,
          scale: pyramidScale,
        }}
      >
        <img
          src={pyramidImg}
          alt="Pyramid"
          className="w-full h-full object-contain opacity-80 filter"
        />
      </motion.div>

      <motion.div
        style={{
          y: flowerY,
          rotate: flowerRotate,
        }}
        className="hidden sm:block absolute w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 top-[15px] sm:top-[30px] left-[40px] sm:left-[100px] z-10 will-change-transform"
      >
        <img
          src={flowerImg}
          alt="Flower"
          className="w-full h-full object-contain drop-shadow-2xl"
        />
      </motion.div>

      <motion.div
        className="hidden sm:block absolute w-16 h-16 sm:w-24 sm:h-24 md:w-28 md:h-28 top-[800px] sm:top-[2030px] md:top-[2400px] left-[80px] sm:left-[200px] md:left-[300px] z-10"
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

      <motion.div
        style={{
          y: cubeY,
          rotate: cubeRotate,
        }}
        className="hidden sm:block absolute w-28 h-28 sm:w-32 sm:h-32 md:w-40 md:h-40 top-[1200px] sm:top-[3030px] md:top-[3500px] -right-[20px] sm:-right-[50px] z-10 will-change-transform"
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
        className="hidden sm:block absolute w-40 h-40 sm:w-48 sm:h-48 md:w-52 md:h-52 top-[1800px] sm:top-[4030px] md:top-[4600px] left-[5px] z-10 will-change-transform"
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
          rotate: starRotate,
        }}
        className="hidden sm:block absolute w-20 h-20 sm:w-24 sm:h-24 md:w-28 md:h-28 top-[2400px] sm:top-[5030px] md:top-[5600px] right-[100px] sm:right-[180px] md:right-[220px] z-10 will-change-transform"
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
