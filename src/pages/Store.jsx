import React, { useEffect, useState } from "react";
import useProductStore from "@/stores/productStore";
import ProductCard from "@/components/product/ProductCard"; 
import { useNavigate } from "react-router-dom";

const Store = () => {
  const { products, actionGetAllProducts } = useProductStore();
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [category, setCategory] = useState([]);
  const [categories, setCategories] = useState([]);
  const [sortType, setSortType] = useState("relevant");
  const navigate = useNavigate();

  useEffect(() => {
    actionGetAllProducts();
  }, [actionGetAllProducts]);

  // Extract unique categories from products
  useEffect(() => {
    const uniqueCategories = [
      ...new Set(products.map((product) => product.ProductCategory?.name)),
    ];
    setCategories(uniqueCategories);
  }, [products]);

  useEffect(() => {
    applyFiltersAndSort();
  }, [category, sortType, products]);

  const toggleCategory = (value) => {
    setCategory((prev) =>
      prev.includes(value) ? prev.filter((item) => item !== value) : [...prev, value]
    );
  };

  const applyFiltersAndSort = () => {
    let filtered = products;

    // Apply category filters
    if (category.length > 0) {
      filtered = filtered.filter((item) => category.includes(item.ProductCategory?.name));
    }

    // Apply sorting
    if (sortType === "low-high") {
      filtered.sort((a, b) => a.price - b.price);
    } else if (sortType === "high-low") {
      filtered.sort((a, b) => b.price - a.price);
     } // else if (sortType === "relevant") {
    //   // Sort by relevance, e.g., by popularity (or another custom field)
    //   filtered.sort((a, b) => b.popularity - a.popularity);
    // }
    setFilteredProducts(filtered);
  };

  return (
    <div className="flex flex-col sm:flex-row gap-6 pt-8 px-4 max-w-[1440px] mx-auto">
      {/* Filter Sidebar */}
      <div className="w-[280px] h-full">
        <h2 className="text-xl font-semibold mb-4">Filters</h2>
        <div className="mb-6">
          <h3 className="font-medium mb-2">Category</h3>
          <div>
            {categories.map((cat) => (
              <label key={cat} className="block">
                <input
                  type="checkbox"
                  value={cat}
                  onChange={() => toggleCategory(cat)}
                  className="mr-2"
                />
                {cat}
              </label>
            ))}
          </div>
        </div>
      </div>

      {/* Product Grid */}
      <div className="flex-1">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">All Products</h2>
          <select
            onChange={(e) => setSortType(e.target.value)}
            className="border px-2 py-1 rounded"
          >
            <option value="relevant">Sort by: Relevant</option>
            <option value="low-high">Sort by: Low to High</option>
            <option value="high-low">Sort by: High to Low</option>
          </select>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} /> 
          ))}
        </div>
      </div>
    </div>
  );
};

export default Store;
