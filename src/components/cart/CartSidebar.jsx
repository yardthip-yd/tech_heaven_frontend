import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Trash } from "lucide-react";
import { Sheet, SheetTrigger, SheetContent, SheetTitle, SheetDescription } from "@/components/ui/sheet";
import { CartIcon } from "@/components/ui/Icon";
import useCartStore from "@/stores/cartStore";
import useAuthStore from "@/stores/authStore";
import LoginModal from "@/components/auth/LoginModal";

const CartSidebar = () => {
    // State and Store Hooks
    const [isCartOpen, setIsCartOpen] = useState(false);
    const cartItems = useCartStore((state) => state.cartItems || []);
    const removeFromCart = useCartStore((state) => state.removeFromCart);
    const increaseAmount = useCartStore((state) => state.increaseAmount);
    const decreaseAmount = useCartStore((state) => state.decreaseAmount);
    const itemCount = cartItems.reduce((total, item) => total + item.quantity, 0);
    const totalPrice = cartItems.reduce((total, item) => total + item.price * item.quantity, 0).toFixed(2);

    // Auth State
    const currentUser = useAuthStore((state) => state.user);
    const isLoggedIn = !!currentUser;
    const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);

    // Navigation Hook
    const navigate = useNavigate();

    // Function to handle "Go to Cart"
    const handleGoToCart = () => {
        if (!isLoggedIn) {
            setIsLoginModalOpen(true); // Open login modal for guests
        } else {
            navigate("/user/cart"); // Navigate to cart for logged-in users
        }
    };

    // Log user state (for debugging)
    useEffect(() => {
        console.log("User logged in:", isLoggedIn);
    }, [isLoggedIn]);

    return (
        <Sheet open={isCartOpen} onOpenChange={setIsCartOpen}>
            <SheetTrigger asChild>
                <div className="cursor-pointer relative">
                    <CartIcon className="w-5 h-5 hover:scale-105 hover:-translate-y-1 hover:duration-200" />
                    {itemCount > 0 && (
                        <span className="absolute -top-2 -right-2 bg-red-600 text-white text-[10px] font-bold rounded-full w-5 h-5 flex items-center justify-center">
                            {itemCount}
                        </span>
                    )}
                </div>
            </SheetTrigger>
            <SheetContent side="right">
                <div className="p-2 flex flex-col h-full">
                    {/* Header */}
                    <div className="flex flex-row items-center mb-2">
                        <CartIcon className="w-8 h-8 mr-2" />
                        <SheetTitle className="text-2xl font-bold">Shopping Bag</SheetTitle>
                    </div>
                    <SheetDescription className="mb-2">
                        This is your shopping bag. You can review your items before checking out.
                    </SheetDescription>

                    {/* Cart Items */}
                    <div className="mt-4 flex-1 overflow-auto">
                        {cartItems.length === 0 ? (
                            <p className="text-gray-500">Your cart is empty.</p>
                        ) : (
                            cartItems.map((item, index) => (
                                <div key={index} className="flex items-start mb-4">
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
                                            <button
                                                className="px-3 py-1 rounded hover:bg-gray-100 text-xs"
                                                onClick={() => decreaseAmount(item.id)}
                                            >
                                                -
                                            </button>
                                            <span className="px-2 py-1 border rounded w-10 text-center text-xs">
                                                {item.quantity}
                                            </span>
                                            <button
                                                className="px-3 py-1 rounded hover:bg-gray-100 text-xs"
                                                onClick={() => increaseAmount(item.id)}
                                            >
                                                +
                                            </button>
                                        </div>
                                        <div className="flex flex-row justify-between">
                                            <p className="text-md text-blue-500 mt-1">
                                                THB {(item.price * item.quantity).toFixed(2)}
                                            </p>
                                            <button className="ml-2" onClick={() => removeFromCart(item.id)}>
                                                <Trash className="w-4 h-4" />
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            ))
                        )}
                    </div>

                    {/* Footer Section */}
                    <div className="border-t pt-4 gap-2 flex flex-col">
                        <div className="flex justify-between items-center">
                            <span className="font-semibold">{itemCount} items</span>
                            <span className="font-semibold">Total: THB {totalPrice}</span>
                        </div>
                        {/* Conditional Buttons */}
                        {!isLoggedIn ? (
                            <button
                                onClick={() => setIsLoginModalOpen(true)}
                                className="bg-gray-300 text-black px-4 py-2 rounded-lg w-full mt-2"
                            >
                                Log in to view cart
                            </button>
                        ) : (
                            <button
                                onClick={handleGoToCart}
                                className="bg-gradient-to-r from-blue-500 to-indigo-500 text-white px-4 py-2 rounded-lg w-full mt-2"
                            >
                                Go to cart
                            </button>
                        )}
                    </div>
                </div>

                {/* Login Modal */}
                <LoginModal
                    isOpen={isLoginModalOpen}
                    onClose={() => setIsLoginModalOpen(false)}
                    onLogin={() => setIsLoginModalOpen(false)}
                />
            </SheetContent>
        </Sheet>
    );
};

export default CartSidebar;
