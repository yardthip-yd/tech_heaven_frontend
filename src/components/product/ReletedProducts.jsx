import React from "react";
import ProductCard from "@/components/product/ProductCard";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";

const RelatedProducts = ({ relatedProducts }) => {
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
              <ProductCard product={product} />
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
    </div>
  );
};

export default RelatedProducts;
