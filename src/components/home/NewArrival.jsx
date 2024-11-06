import React, { useEffect } from "react";
import useProductStore from "@/stores/productStore";
import useCartStore from "@/stores/cartStore";
import ProductCard from "@/components/product/ProductCard"; 
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";

const NewArrival = () => {
  const { products, actionGetAllProducts, loading, error } = useProductStore();
  const addToCart = useCartStore((state) => state.addToCart);
  
  useEffect(() => {
    actionGetAllProducts();
  }, [actionGetAllProducts]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  // Sort products by createdAt date in descending order (newest first)
  const sortedProducts = [...products].sort(
    (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
  );

  return (
    <div className="min-h-[420px] w-full px-8 max-w-[1440px] flex flex-col items-start justify-center mx-auto pt-8">
      <h1 className="text-2xl font-bold mb-4">NEW ARRIVALS</h1>
      <Carousel
        plugins={[Autoplay({ delay: 2000 })]}
        className="w-full overflow-hidden"
      >
        <CarouselContent className="flex space-x-0 w-[292px]">
          {sortedProducts.map((product) => (
            <CarouselItem key={product.id} className="flex-shrink-0 w-[272px]">
              <ProductCard
                product={product}
                onAddToCart={() => addToCart({ ...product, quantity: 1 })}
              />
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
    </div>
  );
};

export default NewArrival;
