import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import useProductStore from "@/stores/productStore";
import useCartStore from "@/stores/cartStore";
import { Heart } from "lucide-react";
import ReletedProducts from "@/components/product/ReletedProducts";

const ProductDetail = () => {
    const { id } = useParams();
    const { products, actionGetAllProducts } = useProductStore();
    const addToCart = useCartStore((state) => state.addToCart);
    const [productData, setProductData] = useState(null);
    const [selectedImage, setSelectedImage] = useState("");
    const [quantity, setQuantity] = useState(1);

    useEffect(() => {
        if (products.length === 0) {
            actionGetAllProducts();
        }
    }, [products, actionGetAllProducts]);

    useEffect(() => {
        if (products.length > 0) {
            const product = products.find((item) => String(item.id) === id);
            if (product) {
                setProductData(product);
                setSelectedImage(product.ProductImages[0]?.imageUrl || "");
            }
        }
    }, [products, id]);

    if (!productData) return <div>Loading...</div>;

    const relatedProducts = products.filter(
        (item) => item.categoryId === productData.categoryId && item.id !== productData.id
    );

    // Function to handle adding to cart
    const handleAddToCart = () => {
        // Call addToCart with product data and quantity
        addToCart({ ...productData, quantity });
    };

    return (
        <div className="px-8 py-12 min-w-[800px] max-w-[1440px] mx-auto">
            {/* Container for Product Images and Info */}
            <div className="flex gap-8">
                {/* Left Side - Product Images */}
                <div className="w-1/2">
                    <div className="flex flex-col gap-4">
                        {/* Main Image */}
                        <div className="flex-1">
                            <img
                                src={selectedImage}
                                alt={productData.name}
                                className="w-full max-h-[600px] object-cover rounded-lg"
                            />
                        </div>
                        {/* Thumbnails */}
                        <div className="flex flex-row gap-4 overflow-y-auto">
                            {productData.ProductImages.map((image, index) => (
                                <img
                                    key={index}
                                    src={image.imageUrl}
                                    alt={`Thumbnail ${index + 1}`}
                                    className="w-20 h-20 object-cover cursor-pointer rounded-lg"
                                    onClick={() => setSelectedImage(image.imageUrl)}
                                />
                            ))}
                        </div>
                    </div>
                </div>

                {/* Right Side - Product Info */}
                <div className="w-1/2">
                    <h1 className="text-3xl font-semibold">{productData.name}</h1>
                    <p className="mt-2 text-gray-500">{productData.description}</p>
                    <div className="mt-4 text-2xl font-bold">THB {productData.price}</div>

                    {/* Quantity Selector */}
                    <div className="flex items-center mt-6">
                        <span className="mr-2 text-sl">Quantity</span>
                        <button
                            className="px-3 py-1 hover:text-blue-500"
                            onClick={() => setQuantity((prev) => Math.max(prev - 1, 1))}
                        >
                            -
                        </button>
                        <span className="px-4 py-2 border border-slate-200 rounded-lg w-16 text-center">{quantity}</span>
                        <button
                            className="px-3 py-1 hover:text-blue-500"
                            onClick={() => setQuantity((prev) => prev + 1)}
                        >
                            +
                        </button>
                    </div>

                    {/* Buttons */}
                    <div className="flex gap-4 mt-8">
                        <button
                            className="bg-black text-white px-6 py-4 rounded hover:scale-110 transition w-1/2 font-medium"
                            onClick={handleAddToCart} 
                        >
                            Add to Cart
                        </button>
                        <button className="bg-gradient-to-r from-blue-500 to-indigo-500 hover:scale-105 text-white px-6 py-4 rounded transition w-1/2 font-medium">
                            Buy Now
                        </button>
                    </div>
                    <div className="flex gap-4 mt-8">
                        <button className="hover:text-red-500 transition hover:scale-105 flex flex-row gap-2">
                            <Heart className="w-6 h-6" />
                            <p>Add to wishlist</p>
                        </button>
                    </div>
                </div>
            </div>

            {/* Related Products Section - Moved Below */}
            <ReletedProducts relatedProducts={relatedProducts} />
        </div>
    );
};

export default ProductDetail;
