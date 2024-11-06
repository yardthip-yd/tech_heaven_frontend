import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useCartStore from "@/stores/cartStore";
import useAuthStore from "@/stores/authStore";
import { Trash } from "lucide-react";

const UserCart = () => {
    const cartItems = useCartStore((state) => state.cartItems || []);
    const removeFromCart = useCartStore((state) => state.removeFromCart);
    const increaseAmount = useCartStore((state) => state.increaseAmount);
    const decreaseAmount = useCartStore((state) => state.decreaseAmount);
    const totalPrice = cartItems.reduce((total, item) => total + item.price * item.quantity, 0).toFixed(2);

    const isLoggedIn = useAuthStore((state) => !!state.user); // Check if user object exists
    const navigate = useNavigate();

    // Check if the user is logged in
    useEffect(() => {
        if (!isLoggedIn) {
            navigate("/login"); // Redirect to login if not logged in
        }
    }, [isLoggedIn, navigate]);

    const handleProceedToCheckout = () => {
        if (!isLoggedIn) {
            navigate("/login");
        } else {
            navigate("/checkout");
        }
    };

    return (
        <div className="p-4">
            <h1 className="text-2xl font-bold mb-4">Your Cart</h1>
            <div className="border-t pt-4">
                {cartItems.length === 0 ? (
                    <p className="text-gray-500">Your cart is empty.</p>
                ) : (
                    <div className="space-y-4">
                        {cartItems.map((item, index) => (
                            <div key={index} className="flex items-start border-b pb-4">
                                {/* Product Image */}
                                <div className="w-24 h-24 mr-4">
                                    <img
                                        src={item.ProductImages[0]?.imageUrl || "https://via.placeholder.com/150"}
                                        alt={item.name}
                                        className="w-full h-full object-cover rounded"
                                    />
                                </div>
                                {/* Product Details */}
                                <div className="flex flex-col flex-1">
                                    <p className="text-md font-semibold">{item.name}</p>
                                    <div className="flex items-center my-2">
                                        {/* Decrease Quantity Button */}
                                        <button
                                            className="px-3 py-1 rounded hover:bg-gray-100 text-xs"
                                            onClick={() => decreaseAmount(item.id)}
                                        >
                                            -
                                        </button>
                                        <span className="px-2 py-1 border rounded w-10 text-center text-xs">
                                            {item.quantity}
                                        </span>
                                        {/* Increase Quantity Button */}
                                        <button
                                            className="px-3 py-1 rounded hover:bg-gray-100 text-xs"
                                            onClick={() => increaseAmount(item.id)}
                                        >
                                            +
                                        </button>
                                    </div>
                                    <p className="text-md text-blue-500 mt-1">
                                        THB {(item.price * item.quantity).toFixed(2)}
                                    </p>
                                </div>
                                {/* Remove Button */}
                                <button
                                    className="ml-2"
                                    onClick={() => removeFromCart(item.id)}
                                >
                                    <Trash className="w-4 h-4" />
                                </button>
                            </div>
                        ))}
                    </div>
                )}
            </div>
            <div className="mt-8">
                <div className="flex justify-between items-center mb-4">
                    <span className="font-semibold">Subtotal</span>
                    <span className="font-semibold">THB {totalPrice}</span>
                </div>
                <div className="text-right">
                    <button
                        className="bg-gradient-to-r from-blue-500 to-indigo-500 text-white px-6 py-3 rounded-lg w-full"
                        onClick={handleProceedToCheckout}
                    >
                        Proceed to Checkout
                    </button>
                    <button
                        className="mt-4 text-blue-500 underline"
                        onClick={() => navigate("/store")}
                    >
                        Continue Shopping
                    </button>
                </div>
            </div>
        </div>
    );
};

export default UserCart;
