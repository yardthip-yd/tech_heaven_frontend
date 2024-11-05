import React, { useEffect } from "react";
import useProductStore from "@/stores/productStore";
import ProductCard from "@/components/product/ProductCard"; 
import { useNavigate } from "react-router-dom";
import { ChevronRight } from "lucide-react";

const AllProduct = () => {
  const { products, actionGetAllProducts, loading, error } = useProductStore();
  const navigate = useNavigate();

  useEffect(() => {
    actionGetAllProducts();
  }, [actionGetAllProducts]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  const handleViewAllClick = () => {
    navigate("/store");
  };

  return (
    <div className="min-h-[420px] w-full px-8 max-w-[1440px] flex flex-col mx-auto pt-8">
      <div className="flex mb-4 flex-row gap-2 justify-between items-center">
        <p className="text-2xl font-bold">ALL PRODUCTS</p>
        <div className="flex items-center cursor-pointer" onClick={handleViewAllClick}>
          <p className="text-blue-500 font-semibold">View All</p>
          <ChevronRight className="text-blue-500" />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-7">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} /> 
        ))}
      </div>
    </div>
  );
};

export default AllProduct;
