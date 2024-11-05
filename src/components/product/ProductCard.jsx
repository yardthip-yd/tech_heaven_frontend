// components/ProductCard.js
import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Heart, ShoppingCart } from "lucide-react";
import { useNavigate } from "react-router-dom";
import useCartStore from "@/stores/cartStore";

const ProductCard = ({ product }) => {
  const addToCart = useCartStore((state) => state.addToCart);
  const navigate = useNavigate();

  const handleAddToCart = () => {
    addToCart({ ...product, quantity: 1 });
  };

  const handleCardClick = () => {
    navigate(`/product/${product.id}`);
  };

  const truncateText = (text, maxLength) => {
    if (text.length > maxLength) {
      return text.slice(0, maxLength) + "...";
    }
    return text;
  };

  return (
    <Card className="border-none shadow-none overflow-hidden rounded-md w-[272px] p-4">
      <CardHeader className="p-0">
        {product.ProductImages && product.ProductImages.length > 0 ? (
          <img
            src={product.ProductImages[0].imageUrl}
            alt={product.name}
            className="w-[240px] h-[240px] object-cover rounded-md"
            onClick={handleCardClick}
          />
        ) : (
          <img
            src="https://via.placeholder.com/150"
            alt="No Image Available"
            className="w-[240px] h-[240px] object-cover rounded-md"
            onClick={handleCardClick}
          />
        )}
      </CardHeader>
      <CardContent className="h-26 p-0 mt-2" onClick={handleCardClick}>
        <CardDescription>{product.ProductCategory?.name}</CardDescription>
        <CardTitle className="mt-2 text-lg">
          {truncateText(product.name, 24)}
        </CardTitle>
        <p className="py-1">{truncateText(product.description, 46)}</p>
      </CardContent>
      <CardFooter className="text-lg font-bold p-0 py-2 flex flex-row items-center justify-between">
        <div className="text-lg">THB {product.price}</div>
        <div className="flex space-x-2">
          <button onClick={handleAddToCart}>
            <ShoppingCart className="w-6 h-6 hover:scale-110 transition-transform hover:text-blue-500" />
          </button>
          <button>
            <Heart className="w-6 h-6 hover:scale-110 transition-transform hover:text-red-500" />
          </button>
        </div>
      </CardFooter>
    </Card>
  );
};

export default ProductCard;
