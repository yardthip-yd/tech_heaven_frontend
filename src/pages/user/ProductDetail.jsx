// ProductDetail.jsx
import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import useProductStore from "../../stores/productStore";

const ProductDetail = () => {
  const { id } = useParams(); // Get product ID from the URL
  const { product, fetchProductById, loading, error } = useProductStore();

  useEffect(() => {
    fetchProductById(id); // Fetch product by ID
  }, [id, fetchProductById]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="p-8 max-w-xl mx-auto">
      {product ? (
        <>
          <h1 className="text-2xl font-bold">{product.name}</h1>
          <p>{product.description}</p>
          <p>Price: THB {product.price}</p>
          {product.ProductImages?.[0] && (
            <img
              src={product.ProductImages[0].imageUrl}
              alt={product.name}
              className="w-full h-auto object-cover rounded-md"
            />
          )}
        </>
      ) : (
        <p>Product not found.</p>
      )}
    </div>
  );
};

export default ProductDetail;
