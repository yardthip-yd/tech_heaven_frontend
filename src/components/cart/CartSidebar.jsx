import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Trash, ShoppingBag, Minus, Plus, X } from "lucide-react";
import { Sheet, SheetTrigger, SheetContent, SheetTitle, SheetDescription } from "@/components/ui/sheet";
import { CartIcon } from "@/components/ui/Icon";
import useCartStore from "@/stores/cartStore";
import useAuthStore from "@/stores/authStore";
import LoginModal from "@/components/auth/LoginModal";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";

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
                    <ScrollArea className="flex-1 -mx-6 px-6">
                        {cartItems.length === 0 ? (
                            <div className="flex flex-col items-center justify-center h-full py-8 text-center">
                                <ShoppingBag className="h-12 w-12 text-slate-300 mb-4" />
                                <p className="text-slate-500 mb-2">Your cart is empty</p>
                                <p className="text-sm text-slate-400">Start shopping to add items to your cart</p>
                            </div>
                        ) : (
                            <div className="divide-y">
                                {cartItems.map((item, index) => (
                                    <div key={index} className="py-4 group">
                                        <div className="flex gap-4">
                                            <div className="relative aspect-square h-24 w-24 overflow-hidden rounded-lg">
                                                <img
                                                    src={item.ProductImages[0]?.imageUrl || "/api/placeholder/150/150"}
                                                    alt={item.name}
                                                    className="object-cover transition-transform group-hover:scale-105"
                                                />
                                            </div>
                                            <div className="flex flex-1 flex-col justify-between">
                                                <h3 className="text-sm font-medium mb-2">{item.name}</h3>
                                                <div className="flex items-center gap-2">
                                                    <Button
                                                        variant="outline"
                                                        size="icon"
                                                        className="h-8 w-8 rounded-full"
                                                        onClick={() => decreaseAmount(item.id)}
                                                    >
                                                        <Minus className="h-3 w-3" />
                                                    </Button>
                                                    <span className="w-8 text-center text-sm">{item.quantity}</span>
                                                    <Button
                                                        variant="outline"
                                                        size="icon"
                                                        className="h-8 w-8 rounded-full"
                                                        onClick={() => increaseAmount(item.id)}
                                                    >
                                                        <Plus className="h-3 w-3" />
                                                    </Button>
                                                    <Button
                                                        variant="ghost"
                                                        size="icon"
                                                        className="h-8 w-8 rounded-full ml-12"
                                                        onClick={() => removeFromCart(item.id)}
                                                    >
                                                        <Trash className="h-4 w-4 text-slate-500" />
                                                    </Button>
                                                </div>
                                                <div className="mt-2">
                                                    <p className="text-base  text-blue-500 font-medium">THB {(item.price * item.quantity).toLocaleString("en-US", { minimumFractionDigits: 2 })}</p>
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
                            <div className="flex items-center justify-between text-base font-medium">
                                <span>Total ({itemCount} items)</span>
                                <span>THB {parseFloat(totalPrice).toLocaleString("en-US", { minimumFractionDigits: 2 })}</span>
                            </div>
                            <Button
                                className="w-full py-6"
                                size="lg"
                                onClick={handleGoToCart}
                                disabled={cartItems.length === 0}
                            >
                                {isLoggedIn ? "Proceed to Checkout" : "Sign in to Checkout"}
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

