import React from "react";
import ProductCard from "@/components/product/ProductCard"; 

const ReletedProducts = ({ relatedProducts }) => {
  return (
    <div className="w-full mt-8">
      <h2 className="text-xl font-bold mb-4">RELATED PRODUCTS</h2>
      <div className="flex space-x-4 overflow-auto">
        {relatedProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default ReletedProducts;
