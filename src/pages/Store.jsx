import React, { useEffect, useState } from "react";
import useProductStore from "@/stores/productStore";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useNavigate } from "react-router-dom";
import { ShoppingCart, Heart } from "lucide-react";
import useCartStore from "@/stores/cartStore";

const Store = () => {
  const { products, actionGetAllProducts } = useProductStore();
  const { actionAddToCart } = useCartStore();
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
    applyFilters();
  }, [category, products]);

  useEffect(() => {
    sortProducts();
  }, [sortType, filteredProducts]);

  const toggleCategory = (value) => {
    setCategory((prev) =>
      prev.includes(value) ? prev.filter((item) => item !== value) : [...prev, value]
    );
  };

  const applyFilters = () => {
    let filtered = products;
    if (category.length > 0) {
      filtered = filtered.filter((item) => category.includes(item.ProductCategory?.name));
    }
    setFilteredProducts(filtered);
  };

  const sortProducts = () => {
    let sorted = [...filteredProducts];
    if (sortType === "low-high") {
      sorted.sort((a, b) => a.price - b.price);
    } else if (sortType === "high-low") {
      sorted.sort((a, b) => b.price - a.price);
    }
    setFilteredProducts(sorted);
  };

  const truncateText = (text, maxLength) => {
    if (text.length > maxLength) {
      return text.slice(0, maxLength) + "...";
    }
    return text;
  };

  // Function to handle card click
  const handleCardClick = (productId) => {
    navigate(`/product/${productId}`);
    console.log("product ID from all product", productId)
  };

  const handleAddToCart = (product) => {
    actionAddToCart({ productId: product.id, quantity: 1 });
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
            <Card
              key={product.id}
              className="border-none shadow-none overflow-hidden rounded-md w-[272px] p-4"
            >
              <CardHeader className="p-0">
                {product.ProductImages && product.ProductImages.length > 0 ? (
                  <img
                    src={product.ProductImages[0].imageUrl}
                    alt={product.name}
                    className="w-[240px] h-[240px] object-cover rounded-md"
                    onClick={() => handleCardClick(product.id)}
                  />
                ) : (
                  <img
                    src="https://via.placeholder.com/150"
                    alt="No Image Available"
                    className="w-[240px] h-[240px] object-cover rounded-md"
                    onClick={() => handleCardClick(product.id)}
                  />
                )}
              </CardHeader>
              <CardContent className="h-26 p-0 mt-2" >
                <CardDescription>{product.ProductCategory?.name}</CardDescription>
                <CardTitle className="mt-2 text-lg">
                  {truncateText(product.name, 24)}
                </CardTitle>
                <p className="py-1"> {truncateText(product.description, 46)}</p>
              </CardContent>
              <CardFooter className="text-lg font-bold p-0 py-2 flex flex-row items-center justify-between">
                <div className="text-lg">THB {product.price}</div>
                <div className="flex space-x-2">
                  {/* Add to Cart Button */}
                  <button onClick={() => handleAddToCart(product)}>
                    <ShoppingCart className="w-6 h-6 hover:scale-110 transition-transform" />
                  </button>
                  {/* Add to Wishlist Button */}
                  <button>
                    <Heart className="w-6 h-6 hover:scale-110 transition-transform hover:text-red-500" />
                  </button>
                </div>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Store;
