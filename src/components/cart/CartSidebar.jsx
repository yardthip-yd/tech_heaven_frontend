import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Trash, ShoppingBag, Minus, Plus } from "lucide-react";
import {
    Sheet,
    SheetTrigger,
    SheetContent,
    SheetTitle,
    SheetDescription,
} from "@/components/ui/sheet";
import useCartStore from "@/stores/cartStore";
import useAuthStore from "@/stores/authStore";
import LoginModal from "@/components/auth/LoginModal";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";

const CartSidebar = () => {
    // State and Store Hooks
    const [isCartOpen, setIsCartOpen] = useState(false);
    const cartItems = useCartStore((state) => state.cartItems);
    const removeFromCart = useCartStore((state) => state.removeFromCart);
    const increaseAmount = useCartStore((state) => state.increaseAmount);
    const decreaseAmount = useCartStore((state) => state.decreaseAmount);
    const getCart1 = useCartStore((state) => state.getCart1); // รับฟังก์ชัน getCart1
    const itemCount = cartItems.reduce((total, item) => total + item.quantity, 0);
    const totalPrice = cartItems
        .reduce((total, item) => total + item.price * item.quantity, 0)
        .toFixed(2);

    // Auth State
    const currentUser = useAuthStore((state) => state.user);
    const isLoggedIn = !!currentUser;
    const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);

    // Navigation Hook
    const navigate = useNavigate();

    // Function to handle "Go to Cart"
    const handleGoToCart = () => {
        if (!isLoggedIn) {
            setIsLoginModalOpen(true);
        } else {
            setIsCartOpen(false);
            navigate("/user/cart");
        }
    };

    // Fetch cart items only when the user is logged in and cartItems is empty
    useEffect(() => {
        if (isLoggedIn && currentUser?.id && cartItems.length === 0) {
            getCart1(currentUser.id);
        }
    }, [isLoggedIn, cartItems.length, currentUser, getCart1]);

    return (
        <Sheet open={isCartOpen} onOpenChange={setIsCartOpen}>
            <SheetTrigger asChild>
                <div className="cursor-pointer relative hover:scale-105 hover:-translate-y-1 hover:duration-200 hover:text-blue-500">
                    <ShoppingBag className="w-5 h-5" />
                    {itemCount > 0 && (
                        <span className="absolute -top-2 -right-2 bg-red-600 text-white text-[10px] font-bold rounded-full w-5 h-5 flex items-center justify-center">
                            {itemCount}
                        </span>
                    )}
                </div>
            </SheetTrigger>
            <SheetContent side="right" className="w-full sm:w-[400px] md:w-[500px]">
                <div className="p-4 sm:p-6 flex flex-col h-full">
                    {/* Header */}
                    <div className="flex items-center mb-4 sm:mb-2">
                        <ShoppingBag className="w-6 h-6 sm:w-8 sm:h-8 mr-2" />
                        <SheetTitle className="text-lg sm:text-2xl font-bold">Shopping Bag</SheetTitle>
                    </div>
                    <SheetDescription className="text-sm sm:text-base mb-4 sm:mb-2">
                        This is your shopping bag. You can review your items before checking out.
                    </SheetDescription>

                    {/* Cart Items */}
                    <ScrollArea className="flex-1 -mx-4 px-4 sm:-mx-6 sm:px-6">
                        {cartItems.length === 0 ? (
                            <div className="flex flex-col items-center justify-center h-full py-8 text-center">
                                <ShoppingBag className="h-10 w-10 sm:h-12 sm:w-12 text-slate-300 mb-4" />
                                <p className="text-slate-500 mb-2">Your cart is empty</p>
                                <p className="text-sm text-slate-400">
                                    Start shopping to add items to your cart
                                </p>
                            </div>
                        ) : (
                            <div className="divide-y">
                                {cartItems.map((item, index) => (
                                    <div key={index} className="py-4 group">
                                        <div className="flex gap-3 sm:gap-4">
                                            <div className="relative aspect-square h-20 w-20 sm:h-24 sm:w-24 overflow-hidden rounded-lg">
                                                <img
                                                    src={item.ProductImages[0]?.imageUrl || "/api/placeholder/150/150"}
                                                    alt={item.name}
                                                    className="object-cover transition-transform group-hover:scale-105"
                                                />
                                            </div>
                                            <div className="flex flex-1 flex-col justify-between">
                                                <h3 className="text-sm sm:text-base font-medium mb-1 sm:mb-2">
                                                    {item.name}
                                                </h3>
                                                <div className="flex items-center gap-1 sm:gap-2">
                                                    <Button
                                                        variant="outline"
                                                        size="icon"
                                                        className="h-7 w-7 sm:h-8 sm:w-8 rounded-full"
                                                        onClick={() => decreaseAmount(item.id)}
                                                    >
                                                        <Minus className="h-3 w-3" />
                                                    </Button>
                                                    <span className="w-6 sm:w-8 text-center text-sm">
                                                        {item.quantity}
                                                    </span>
                                                    <Button
                                                        variant="outline"
                                                        size="icon"
                                                        className="h-7 w-7 sm:h-8 sm:w-8 rounded-full"
                                                        onClick={() => increaseAmount(item.id)}
                                                    >
                                                        <Plus className="h-3 w-3" />
                                                    </Button>
                                                    <Button
                                                        variant="ghost"
                                                        size="icon"
                                                        className="h-7 w-7 sm:h-8 sm:w-8 rounded-full ml-6 sm:ml-12 hover:bg-red-100 transition-colors p-2"
                                                        onClick={() => removeFromCart(item.id)}
                                                    >
                                                        <Trash className="h-3 w-3 sm:h-4 sm:w-4 text-slate-500 hover:text-red-600" />
                                                    </Button>
                                                </div>
                                                <div className="mt-2 text-blue-500 font-medium">
                                                    THB {(item.price * item.quantity).toLocaleString("en-US", {
                                                        minimumFractionDigits: 2,
                                                    })}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </ScrollArea>

                    {/* Footer Section */}
                    <div className="border-t pt-4">
                        <div className="space-y-4">
                            <div className="flex items-center justify-between text-sm sm:text-base font-medium">
                                <span>Total ({itemCount} items)</span>
                                <span>
                                    THB{" "}
                                    {parseFloat(totalPrice).toLocaleString("en-US", {
                                        minimumFractionDigits: 2,
                                    })}
                                </span>
                            </div>
                            <Button
                                className="w-full py-4 sm:py-6 text-sm sm:text-lg"
                                size="lg"
                                onClick={handleGoToCart}
                                disabled={cartItems.length === 0}
                            >
                                {isLoggedIn ? "View Cart" : "Sign in to Checkout"}
                            </Button>
                        </div>
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
