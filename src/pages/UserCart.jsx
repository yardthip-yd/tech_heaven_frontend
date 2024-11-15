import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useCartStore from "@/stores/cartStore";
import useAuthStore from "@/stores/authStore";
import { Trash, Truck, Plus, Minus, ShoppingBag } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const UserCart = () => {
  const cartItems = useCartStore((state) => state.cartItems || []);
  const createCart = useCartStore(state => state.createCart)
  const removeFromCart = useCartStore((state) => state.removeFromCart);
  const increaseAmount = useCartStore((state) => state.increaseAmount);
  const decreaseAmount = useCartStore((state) => state.decreaseAmount);
  const totalPrice = cartItems
    .reduce((total, item) => total + item.price * item.quantity, 0)
    .toLocaleString("en-US", { minimumFractionDigits: 2 });

  const isLoggedIn = useAuthStore((state) => !!state.user);
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoggedIn) {
      navigate("/login");
    }
  }, [isLoggedIn, navigate]);

  const handleProceedToCheckout = () => {
    if (!isLoggedIn) {
      navigate("/login");
    } else {
      createCart({ item: cartItems })
        .then((res) => {
          console.log(res);
          navigate("/user/payment");
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  return (
    <div className="bg-slate-50 p-4 md:p-8 overflow-y-auto h-full mt-12 md:mt-0">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="flex flex-col gap-4 mb-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center text-center gap-2">
              <h1 className="text-xl sm:text-2xl md:text-3xl font-bold">Shopping Cart</h1>
              <span className="text-base sm:text-lg font-medium">( {cartItems.length} items )</span>
            </div>
            <Button
              variant="ghost"
              onClick={() => navigate("/store")}
              className="flex items-center gap-2"
            >
              <ShoppingBag className="w-4 h-4" />
              <span className="text-sm md:text-base">Continue Shopping</span>
            </Button>
          </div>
        </div>

        {/* Cart Content */}
        <div className="space-y-6">
          {cartItems.length === 0 ? (
            <Card>
              <CardContent className="flex flex-col items-center justify-center py-8 sm:py-12">
                <ShoppingBag className="w-12 h-12 sm:w-16 sm:h-16 text-slate-300 mb-4" />
                <p className="text-slate-500 text-base sm:text-lg mb-4">Your cart is empty</p>
                <button
                  onClick={() => navigate("/store")}
                  className="bg-blue-500 text-white px-4 py-2 sm:px-6 sm:py-2 rounded-lg hover:bg-blue-600 transition-colors"
                >
                  Start Shopping
                </button>
              </CardContent>
            </Card>
          ) : (
            <div className="grid gap-4 sm:gap-6">
              {cartItems.map((item, index) => (
                <Card key={index}>
                  <CardContent className="p-4">
                    <div className="flex items-start gap-4">

                      <div className="w-24 h-24 md:w-32 md:h-32 flex-shrink-0">
                        <img
                          src={item.ProductImages[0]?.imageUrl || "/api/placeholder/150/150"}
                          alt={item.name}
                          className="w-full h-full object-cover rounded-lg shadow-sm"
                        />
                      </div>

                      <div className="flex-1 flex flex-col justify-between">
                        <div className="flex justify-between items-start">
                          <h3 className="font-semibold text-lg sm:text-xl text-slate-900">
                            {item.name}
                          </h3>
                          <button
                            onClick={() => removeFromCart(item.id)}
                            className="rounded-full hover:bg-red-100 transition-colors p-2"
                          >
                            <Trash className="w-4 h-4 sm:w-5 sm:h-5 text-slate-500 hover:text-red-600 transition-colors" />
                          </button>
                        </div>

                        {/* Quantity Controls */}
                        <div className="flex items-center mt-4 space-x-4">
                          <div className="flex items-center">
                            <Button
                              variant="outline"
                              size="icon"
                              className="h-8 w-8 sm:h-10 sm:w-10 rounded-full"
                              onClick={() => decreaseAmount(item.id)}
                            >
                              <Minus className="w-4 h-4" />
                            </Button>
                            <span className="px-3 py-1 sm:px-4 sm:py-2 font-medium text-slate-700">
                              {item.quantity}
                            </span>
                            <Button
                              variant="outline"
                              size="icon"
                              className="h-8 w-8 sm:h-10 sm:w-10 rounded-full"
                              onClick={() => increaseAmount(item.id)}
                            >
                              <Plus className="w-4 h-4" />
                            </Button>
                          </div>
                          <p className="text-lg font-medium text-blue-600">
                            THB {(item.price * item.quantity).toLocaleString("en-US", { minimumFractionDigits: 2 })}
                          </p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}

          {/* Order Summary */}
          {cartItems.length > 0 && (
            <Card className="mt-8">
              <CardContent className="p-4 sm:p-6">
                <div className="flex items-center gap-2 mb-4">
                  <Truck className="w-4 h-4 sm:w-5 sm:h-5" />
                  <h2 className="text-lg sm:text-xl font-semibold">Order Summary</h2>
                </div>
                <div className="space-y-2 sm:space-y-3">
                  <div className="flex justify-between text-sm sm:text-base">
                    <span className="text-slate-600">Subtotal</span>
                    <span className="font-medium">THB {totalPrice}</span>
                  </div>
                  <div className="flex justify-between text-sm sm:text-base">
                    <span className="text-slate-600">Shipping</span>
                    <span className="text-slate-600">Calculated at checkout</span>
                  </div>
                  <div className="border-t pt-3">
                    <div className="flex justify-between text-sm sm:text-base">
                      <span className="font-semibold">Total</span>
                      <span className="font-semibold text-lg sm:text-xl">THB {totalPrice}</span>
                    </div>
                  </div>
                </div>

                <button
                  className="w-full mt-4 sm:mt-6 bg-gradient-to-r from-blue-500 to-indigo-600 text-white py-2 sm:py-3 rounded-lg font-medium hover:from-blue-600 hover:to-indigo-700 transition-colors focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                  onClick={handleProceedToCheckout}
                >
                  Proceed to Checkout
                </button>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>


  );
};

export default UserCart;
