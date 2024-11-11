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
  const observerRef = useRef(null);

  useEffect(() => {
    actionGetAllProducts();
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
  }, [category, sortType, products, priceRange]);

  const toggleCategory = (value) => {
    setCategory((prev) =>
      prev.includes(value) ? prev.filter((item) => item !== value) : [...prev, value]
    );
  };

  const clearCategory = () => {
    setCategory([]);
  };

  const applyFiltersAndSort = () => {
    let filtered = products;
    if (category.length > 0) {
      filtered = filtered.filter((item) => category.includes(item.ProductCategory?.name));
    }
    filtered = filtered.filter(
      (item) => item.price >= priceRange[0] && item.price <= priceRange[1]
    );

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
    <div className="max-w-[1440px] mx-auto px-4 py-8">
      <div className="flex flex-col lg:flex-row gap-6">
        {/* Filters Sidebar */}
        <div className="w-full lg:w-[280px]">
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
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mt-4">
            {filteredProducts.slice(0, productsToShow).map((product) => (
              <div key={product.id} className="shadow-lg">
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
              <p className="text-slate-500">No products found matching your criteria.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Store;
