import React, { useEffect, useState } from "react";
import useProductStore from "@/stores/productStore";
import ProductCard from "@/components/product/ProductCard";
import PriceRange from "@/components/cart/PriceRange";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Filter } from "lucide-react";

const Store = () => {
  const { products, actionGetAllProducts } = useProductStore();
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [category, setCategory] = useState([]);
  const [categories, setCategories] = useState([]);
  const [sortType, setSortType] = useState("low-high");
  const [priceRange, setPriceRange] = useState([0, 0]);
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(0);

  useEffect(() => {
    actionGetAllProducts(1000);
  }, [actionGetAllProducts]);

  useEffect(() => {
    if (products.length > 0) {
      const prices = products.map((product) => product.price);
      const min = Math.min(...prices);
      const max = Math.max(...prices);
      setMinPrice(min);
      setMaxPrice(max);
      setPriceRange([min, max]);
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
      prev.includes(value)
        ? prev.filter((item) => item !== value)
        : [...prev, value]
    );
  };

  const applyFiltersAndSort = () => {
    let filtered = products;

    if (category.length > 0) {
      filtered = filtered.filter((item) =>
        category.includes(item.ProductCategory?.name)
      );
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

  const FiltersSidebar = () => (
    <Card className="max-h-[calc(100vh-4rem)] overflow-auto">
      <CardContent className="p-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <Filter className="w-5 h-5" />
            <h2 className="text-xl font-semibold">Filters</h2>
          </div>
          {category.length > 0 && (
            <button
              onClick={() => setCategory([])}
              className="text-sm text-blue-600 hover:text-blue-800"
            >
              Clear all
            </button>
          )}
        </div>

        <Separator className="mb-6" />

        <div className="space-y-6">
          <div>
            <h3 className="font-medium mb-3">Category</h3>
            <ScrollArea className="pr-4">
              <div className="space-y-2">
                {categories.map((cat) => (
                  <div key={cat} className="flex items-center space-x-2">
                    <Checkbox
                      id={cat}
                      checked={category.includes(cat)}
                      onCheckedChange={() => toggleCategory(cat)}
                    />
                    <label
                      htmlFor={cat}
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      {cat}
                    </label>
                  </div>
                ))}
              </div>
            </ScrollArea>
          </div>

          <Separator />

          <div>
            <h3 className="font-medium mb-3">Price</h3>
            <PriceRange
              priceRange={priceRange}
              onPriceChange={(newRange) => setPriceRange(newRange)}
              min={minPrice}
              max={maxPrice}
            />
          </div>
        </div>
      </CardContent>
    </Card>
  );

  return (
    <div className="max-w-[1440px] mx-auto px-4 py-8">
      <div className="flex flex-col lg:flex-row gap-6">
        {/* Filters Sidebar */}
        <div className="w-full lg:w-[300px]">
          <FiltersSidebar />
        </div>

        {/* Products Section */}
        <div className="flex-1">
          <div className="flex justify-between">
            <div className="flex items-center gap-2">
              <h2 className="text-3xl font-bold font-prompt bg-gradient-to-r from-black via-blue-600 to-indigo-600 bg-clip-text text-transparent">
                ALL PRODUCTS
              </h2>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-gray-600 text-sm">Sort by:</span>
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
          <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
            <div className="flex flex-wrap items-center gap-2">
              {category.map((cat) => (
                <Badge key={cat} variant="secondary">
                  {cat}
                  <button
                    className="ml-2 hover:text-red-500"
                    onClick={() => toggleCategory(cat)}
                  >
                    ✕
                  </button>
                </Badge>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>

          {filteredProducts.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-500">
                No products found matching your criteria.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Store;
