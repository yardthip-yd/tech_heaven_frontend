import React, { useEffect } from "react";
import useProductStore from "@/stores/productStore";
import useCartStore from "@/stores/cartStore";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import { Heart, ShoppingCart } from "lucide-react";
import { useNavigate } from "react-router-dom";

const NewArrival = () => {
  const { products, actionGetAllProducts, loading, error } = useProductStore();
  const addToCart = useCartStore((state) => state.addToCart); // Use addToCart from useCartStore
  const navigate = useNavigate();

  useEffect(() => {
    actionGetAllProducts();
  }, [actionGetAllProducts]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  // Sort products by createdAt date in descending order (newest first)
  const sortedProducts = [...products].sort(
    (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
  );

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

  const handleCardClick = (productId) => {
    navigate(`/product/${productId}`);
  };

  return (
    <div className="min-h-[420px] w-full px-8 max-w-[1440px] flex flex-col items-start justify-center mx-auto pt-8">
      <h1 className="text-2xl font-bold mb-4">NEW ARRIVALS</h1>
      <Carousel
        plugins={[Autoplay({ delay: 2000 })]}
        className="w-full overflow-hidden"
      >
        <CarouselContent className="flex space-x-0 w-[292px]">
          {sortedProducts.map((product) => (
            <CarouselItem key={product.id} className="flex-shrink-0 w-[2720px]">
              <Card className="border-none shadow-none overflow-hidden rounded-md p-4">
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
                <CardContent
                  className="h-24 p-0 mt-2"
                  onClick={() => handleCardClick(product.id)}
                >
                  <CardDescription>{product.ProductCategory?.name}</CardDescription>
                  <CardTitle className="mt-2">{product.name}</CardTitle>
                  <p className="py-1">{truncateText(product.description, 46)}</p>
                </CardContent>
                <CardFooter className="text-lg font-bold p-0 py-2 flex flex-row items-center justify-between">
                  <div className="text-lg">THB {product.price}</div>
                  <div className="flex space-x-2">
                    <button onClick={() => handleAddToCart(product)}>
                      <ShoppingCart className="w-6 h-6 hover:scale-110 transition-transform hover:text-blue-500" />
                    </button>
                    <button>
                      <Heart className="w-6 h-6 hover:scale-110 transition-transform hover:text-red-500" />
                    </button>
                  </div>
                </CardFooter>
              </Card>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
    </div>
  );
};

export default NewArrival;
