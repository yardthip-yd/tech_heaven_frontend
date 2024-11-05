import React, { useEffect } from "react";
import useProductStore from "@/stores/productStore";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import useCartStore from "@/stores/cartStore";
import { Heart, ShoppingCart, ChevronRight } from "lucide-react";
import { useNavigate } from "react-router-dom";


const AllProduct = () => {
  const { products, actionGetAllProducts, loading, error } = useProductStore();
  const addToCart = useCartStore((state) => state.addToCart);
  // const { actionAddToCart, actionUpdateCartItem, actionRemoveCartItem } = useCartStore();
  const navigate = useNavigate();

  useEffect(() => {
    actionGetAllProducts();
  }, [actionGetAllProducts]);

  console.log("get all product", products);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  const truncateText = (text, maxLength) => {
    if (text.length > maxLength) {
      return text.slice(0, maxLength) + "...";
    }
    return text;
  };

  // Adding product to the cart
  const handleAddToCart = (product) => {
    addToCart({ ...product, quantity: 1 });
  };

  // Function to handle card click
  const handleCardClick = (productId) => {
    navigate(`/product/${productId}`);
    // console.log("product ID from all product", productId)
  };

  const handleViewAllClick = () => {
    navigate("/store");
  };

  return (
    <div className="min-h-[420px] w-full px-8 max-w-[1440px] flex flex-col mx-auto pt-8">
      <div className="flex mb-4 flex-row gap-2 justify-between items-center">
        <p className="text-2xl font-bold">ALL PRODUCTS</p>
        <div className="flex items-center cursor-pointer" onClick={handleViewAllClick} >
          <p className="text-blue-500 font-semibold">View All</p>
          <ChevronRight className="text-blue-500" />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-7">
        {products.map((product) => (
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
            <CardContent className="h-26 p-0 mt-2" onClick={() => handleCardClick(product.id)}>
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
                  <ShoppingCart className="w-6 h-6 hover:scale-110 transition-transform hover:text-blue-500" />
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
  );
};

export default AllProduct;
