import React, { useState, useEffect } from "react";
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
import { toast } from "react-toastify";
import useCartStore from "@/stores/cartStore";
import useWishlistStore from "@/stores/wishlistStore";
import useAuthStore from "@/stores/authStore";
import LoginModal from "@/components/auth/LoginModal";

const ProductCard = ({ product }) => {
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const addToCart = useCartStore((state) => state.addToCart);
  const { actionAddToWishlist } = useWishlistStore();
  const { user, getCurrentUser, token } = useAuthStore();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      getCurrentUser();
    }
  }, [user, getCurrentUser]);

  const handleAddToCart = () => {
    addToCart({ ...product, quantity: 1 });
    toast.success("Added to cart!");
  };

  const handleHeartClick = async () => {
    if (!user) {
      setIsLoginModalOpen(true);
    } else {
      try {
        await actionAddToWishlist(token, product.id);
        toast.success("Added to wishlist!");
      } catch (error) {
        toast.error("Failed to add to wishlist");
      }
    }
  };

  const handleCardClick = () => {
    navigate(`/product/${product.id}`);
  };

  const truncateText = (text, maxLength) => {
    return text.length > maxLength ? `${text.slice(0, maxLength)}...` : text;
  };

  return (
    <Card className="border-none shadow-none overflow-hidden rounded-md w-[272px] p-4">
      <CardHeader className="p-0">
        {product.ProductImages?.[0]?.imageUrl ? (
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
          {truncateText(product.name, 20)}
        </CardTitle>
        <p className="py-1">{truncateText(product.description, 40)}</p>
      </CardContent>
      <CardFooter className="text-lg font-bold p-0 py-2 flex flex-row items-center justify-between">
      <div className="text-lg">THB {product.price.toLocaleString("en-US", { minimumFractionDigits: 2 })}</div>
        <div className="flex space-x-2">
          <button onClick={handleAddToCart}>
            <ShoppingCart className="w-6 h-6 hover:scale-110 transition-transform hover:text-blue-500" />
          </button>
          <button onClick={handleHeartClick}>
            <Heart className="w-6 h-6 hover:scale-110 transition-transform hover:text-red-500" />
          </button>
        </div>
      </CardFooter>
      
      {/* Login Modal */}
      {isLoginModalOpen && (
        <LoginModal
          isOpen={isLoginModalOpen}
          onClose={() => setIsLoginModalOpen(false)}
          onLogin={() => setIsLoginModalOpen(false)}
        />
      )}
    </Card>
  );
};

export default ProductCard;
