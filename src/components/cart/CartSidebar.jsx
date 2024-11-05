import {
  Sheet,
  SheetTrigger,
  SheetContent,
  SheetTitle,
  SheetDescription,
} from "@/components/ui/sheet";
import { CartIcon } from "../ui/Icon";
import { useState } from "react";

import useCartStore from "@/stores/cartStore";
import useAuthStore from "@/stores/authStore";
import LoginModal from "@/components/auth/LoginModal";

import { useNavigate } from "react-router-dom";

const CartSidebar = () => {
  const [isCartOpen, setIsCartOpen] = useState(false);

  const cartItems = useCartStore((state) => state.cartItems);
  const itemCount = cartItems.reduce((total, item) => total + item.quantity, 0);

  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const { isLoggedIn } = useAuthStore();

  const navigate = useNavigate();

  const handleCheckout = () => {
    if (!isLoggedIn) {
      setIsLoginModalOpen(true);
    } else {
      navigate("/mycart");
    }
  };

  return (
    <Sheet open={isCartOpen} onOpenChange={setIsCartOpen}>
      <SheetTrigger asChild>
        <div className="cursor-pointer">
          <CartIcon className="w-5 h-5 hover:scale-105 hover:-translate-y-1 hover:duration-200" />
          {/* Badge จำนวนสินค้า */}
          {itemCount > 0 && (
            <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs font-bold rounded-full px-2 py-0.5">
              {itemCount}
            </span>
          )}
        </div>
      </SheetTrigger>
      <SheetContent side="right">
        <div className="p-4">
          <div className="flex flex-row items-center mb-2">
            <CartIcon className="w-8 h-8 mr-2" />
            <SheetTitle className="text-2xl font-bold">Shopping Bag</SheetTitle>
          </div>
          <SheetDescription className="mb-2">
            This is your shopping bag. You can review your items before checking
            out.
          </SheetDescription>

          <div className="mt-4">
            {cartItems.length === 0 ? (
              <p className="text-gray-500">Your cart is empty.</p>
            ) : (
              cartItems.map((item, index) => (
                <div
                  key={index}
                  className="flex justify-between items-center mb-4"
                >
                  <div>
                    <p className="text-sm">{item.name}</p>
                    <p className="text-gray-500 text-sm">
                      THB {item.price} x {item.quantity}
                    </p>
                  </div>
                  <button className="text-slate-900">X</button>
                </div>
              ))
            )}
          </div>
          <div className="flex justify-between mt-4 flex-col">
            <span className="font-semibold">
              Total: THB{" "}
              {cartItems
                .reduce((total, item) => total + item.price * item.quantity, 0)
                .toFixed(2)}
            </span>
            <button
              onClick={handleCheckout}
              className="bg-gradient-to-r from-blue-500 to-indigo-500 text-white px-4 py-2 rounded-xl w-full mt-2"
            >
              Checkout
            </button>
          </div>
        </div>
      </SheetContent>

      {/* Login Modal */}
      <LoginModal
        isOpen={isLoginModalOpen}
        onClose={() => setIsLoginModalOpen(false)}
        onLogin={() => setIsLoginModalOpen(false)}
      />
    </Sheet>
  );
};

export default CartSidebar;
