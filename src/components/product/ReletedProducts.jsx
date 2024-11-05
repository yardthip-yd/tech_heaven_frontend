import React from "react";
import { useNavigate } from "react-router-dom";
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
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import useCartStore from "@/stores/cartStore";
import { Heart, ShoppingCart } from "lucide-react";

const ReletedProducts = ({ relatedProducts }) => {
  const { actionAddToCart } = useCartStore();
  const navigate = useNavigate();

  const handleAddToCart = (product) => {
    actionAddToCart({
      userId: "guest", // Adjust based on user authentication if needed
      productId: product.id,
      quantity: 1,
    });
  };

  const handleCardClick = (productId) => {
    navigate(`/product/${productId}`);
  };

  return (
    <div className="w-full mt-8">
      <h2 className="text-xl font-bold mb-4">RELATED PRODUCTS</h2>
      <Carousel
        plugins={[Autoplay({ delay: 2000 })]}
        className="w-full overflow-hidden"
      >
        <CarouselContent className="flex space-x-0 w-[292px]">
          {relatedProducts.map((product) => (
            <CarouselItem key={product.id} className="flex-shrink-0 w-[272px]">
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
                      className="w-[240px] h-[240px] object-cover"
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
                  <p className="py-1">{product.description.slice(0, 48)}...</p>
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

export default ReletedProducts;
