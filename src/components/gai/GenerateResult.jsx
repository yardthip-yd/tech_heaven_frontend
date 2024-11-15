import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ShoppingCart } from 'lucide-react';
import specDefaultImg from "@/assets/image/specDefaultImg.jpg";
import useProductStore from "@/stores/productStore";
import useCartStore from "@/stores/cartStore";
import { toast } from "react-toastify";
import { findBestMatchingProduct } from "@/components/gai/findBestMatchingProduct"; 

const GenerateResult = ({ specData }) => {
    const { products, actionGetAllProducts } = useProductStore();
    const addToCart = useCartStore((state) => state.addToCart);
    const [mappedResults, setMappedResults] = useState([]);

    useEffect(() => {
        actionGetAllProducts();
    }, [actionGetAllProducts]);

    useEffect(() => {
        if (specData && products.length > 0) {
            const resultsWithLinks = Object.entries(specData.Components).map(([component, items]) => ({
                component,
                items: items.map((item) => {
                    const matchedProduct = findBestMatchingProduct(item.productName, products);
                    return {
                        ...item,
                        matchedProductId: matchedProduct ? matchedProduct.id : null,
                        matchedProductPrice: matchedProduct ? matchedProduct.price : item.estimatePrice,
                        matchedProductImage: matchedProduct?.ProductImages?.[0]?.imageUrl || specDefaultImg
                    };
                })
            }));
            setMappedResults(resultsWithLinks);
        }
    }, [specData, products]);

    const handleAddToCart = (product) => {
        addToCart({ ...product, quantity: 1 });
        toast.success("Added to cart!");
    };

    if (!specData) return null;

    return (
        <div className="mt-8 w-full max-w-4xl bg-white p-6 rounded-xl shadow-lg">
            <h3 className="text-2xl font-bold mb-4">Generated Specifications</h3>
            {mappedResults.map(({ component, items }) => (
                <div key={component} className="mb-6">
                    <h4 className="text-xl font-semibold text-slate-700 mb-2">{component}</h4>
                    <ul className="space-y-4">
                        {items.map((item, index) => (
                            <li key={index} className="flex items-center space-x-4 bg-slate-50 p-4 rounded-lg border">
                                <img
                                    src={item.matchedProductImage}
                                    alt={item.productName}
                                    className="w-16 h-16 object-cover rounded-md"
                                />
                                <div className="flex-grow">
                                    <p className="font-medium text-slate-800">{item.productName}</p>
                                    <p className="text-sm text-slate-600">{item.productDescription}</p>
                                    <p className="text-sm font-semibold text-slate-800">
                                        {item.matchedProductId
                                            ? `Price: THB ${item.matchedProductPrice.toLocaleString("en-US", { minimumFractionDigits: 2 })}`
                                            : `Estimated Price: THB ${item.estimatePrice.toLocaleString("en-US", { minimumFractionDigits: 2 })}`}
                                    </p>
                                </div>
                                {item.matchedProductId && (
                                    <div className="flex space-x-2">
                                        <Link
                                            to={`/product/${item.matchedProductId}`}
                                            className="px-3 py-1 bg-slate-700 text-white rounded-lg hover:bg-blue-600 w-[120px] text-center"
                                        >
                                            View Details
                                        </Link>
                                        <button
                                            onClick={() => handleAddToCart(products.find(p => p.id === item.matchedProductId))}
                                            className="p-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
                                        >
                                            <ShoppingCart className="w-5 h-5" />
                                        </button>
                                    </div>
                                )}
                            </li>
                        ))}
                    </ul>
                </div>
            ))}
        </div>
    );
};

export default GenerateResult;
