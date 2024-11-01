import { Sheet, SheetTrigger, SheetContent, SheetTitle, SheetDescription } from "@/components/ui/sheet";
import { CartIcon } from "../ui/Icon"; // Adjust the path if necessary
import { useState } from "react";

const CartSidebar = () => {
    const [isCartOpen, setIsCartOpen] = useState(false);

    return (
        <Sheet open={isCartOpen} onOpenChange={setIsCartOpen}>
            <SheetTrigger asChild>
                <div className="cursor-pointer">
                    <CartIcon className="w-5 h-5 hover:scale-105 hover:-translate-y-1 hover:duration-200" />
                </div>
            </SheetTrigger>
            <SheetContent side="right">
                <div className="p-4">
                    <div className="flex flex-row items-center mb-2">
                        <CartIcon className="w-8 h-8 mr-2" />
                        <SheetTitle className="text-2xl font-bold">Shopping Bag</SheetTitle>
                    </div>
                    <SheetDescription className="mb-2">
                        This is your shopping bag. You can review your items before checking out.
                    </SheetDescription>

                    {/* Render cart items */}
                    <div className="mt-4">

                        {/* Example cart item */}
                        <div className="flex justify-between items-center mb-4">
                            <div>
                                <p className="text-sm">DANVOUY WOMEN'S T SHIRT</p>
                                <p className="text-gray-500 text-sm">$12.99</p>
                            </div>
                            <button className="text-slate-900">X</button>
                        </div>

                        {/* Add more cart items as needed */}
                    </div>
                    <div className="flex justify-between mt-4 flex-col">
                        <span className="font-semibold">Total: $62.83</span>
                        <button className="bg-gradient-to-r from-blue-500 to-indigo-500 text-white px-4 py-2 rounded-xl w-full">
                            Checkout
                        </button>
                    </div>
                </div>
            </SheetContent>
        </Sheet>
    );
};

export default CartSidebar;
