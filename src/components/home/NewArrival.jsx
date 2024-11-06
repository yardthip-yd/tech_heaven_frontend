import React, { useEffect } from "react";
import useProductStore from "@/stores/productStore";
import useAuthStore from "@/stores/authStore";
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
import useCartStore from "@/stores/cartStore";
import { Heart, ShoppingCart } from "lucide-react";
import { useNavigate } from "react-router-dom";

const NewArrival = () => {
  const { products, actionGetAllProducts, loading, error } = useProductStore();
  const { actionAddToCart } = useCartStore();
  const navigate = useNavigate();

  useEffect(() => {
    actionGetAllProducts();
  }, [actionGetAllProducts]);

  // console.log("get all product", products);

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

  const handleAddToCart = (product) => {
    actionAddToCart({
      userId: currentUser ? currentUser.id : "guest",
      productId: product.id,
      quantity: 1,
    });
  };

  // Function to handle card click
  const handleCardClick = (productId) => {
    navigate(`/product/${productId}`);
    console.log("product ID from all product", productId);
  };

  return (
    <div className="min-h-[420px] w-full px-8 max-w-[1440px] flex flex-col items-start justify-center mx-auto">
      <h1 className="text-2xl font-bold mb-4">NEW ARRIVALS</h1>
      <Carousel
        plugins={[Autoplay({ delay: 2000 })]}
        className="w-full overflow-hidden"
      >
        <CarouselContent className="flex space-x-0 w-[292px] gap-2]">
          {sortedProducts.map((product) => (
            <CarouselItem key={product.id} className="flex-shrink-0 w-[2720px]">
              <Card
                className="border-none shadow-none overflow-hidden rounded-md p-4"
                onClick={() => handleCardClick(product.id)}
              >
                <CardHeader className="p-0">
                  {product.ProductImages && product.ProductImages.length > 0 ? (
                    <img
                      src={product.ProductImages[0].imageUrl}
                      alt={product.name}
                      className="w-[240px] h-[240px] object-cover rounded-md"
                    />
                  ) : (
                    <img
                      src="https://via.placeholder.com/150"
                      alt="No Image Available"
                      className="w-[240px] h-[240px] object-cover"
                    />
                  )}
                </CardHeader>
                <CardContent className="h-24 p-0 mt-2">
                  <CardDescription>
                    {product.ProductCategory?.name}
                  </CardDescription>
                  <CardTitle className="mt-2">{product.name}</CardTitle>
                  <p className="py-1">{product.description.slice(0, 48)}...</p>
                </CardContent>
                <CardFooter className="text-lg font-bold p-0 py-2 flex flex-row items-center justify-between">
                  <div>THB {product.price}</div>
                  <div className="flex space-x-2">
                    <button onClick={() => handleAddToCart(product)}>
                      <ShoppingCart className="w-5 h-5 hover:scale-110 transition-transform" />
                    </button>
                    <button>
                      <Heart className="w-5 h-5 hover:scale-110 transition-transform" />
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
