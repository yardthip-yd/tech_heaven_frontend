import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useCartStore from "@/stores/cartStore";
import useAuthStore from "@/stores/authStore";
import { Trash, Truck, Plus, Minus, ShoppingBag } from "lucide-react";
import { createCart } from "@/API/cart-api";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const UserCart = () => {
  const cartItems = useCartStore((state) => state.cartItems || []);
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
    <div className=" bg-slate-50 p-4 md:p-8 overflow-y-auto max-h-[80vh]">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="flex flex-col gap-4 mb-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center text-center gap-2">
              <h1 className="text-2xl md:text-3xl font-bold">Shopping Cart</h1>
              <span className="text-lg font-medium">( {cartItems.length} items )</span>
            </div>
            <Button
              variant="ghost"
              onClick={() => navigate("/store")}
              className="flex items-center gap-2"
            >
              <ShoppingBag className="w-4 h-4" />
              Continue Shopping
            </Button>
          </div>
        </div>

        {/* Cart Content */}
        <div className="space-y-6">
          {cartItems.length === 0 ? (
            <Card>
              <CardContent className="flex flex-col items-center justify-center py-12">
                <ShoppingBag className="w-16 h-16 text-slate-300 mb-4" />
                <p className="text-slate-500 text-lg mb-4">Your cart is empty</p>
                <button
                  onClick={() => navigate("/store")}
                  className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 transition-colors"
                >
                  Start Shopping
                </button>
              </CardContent>
            </Card>
          ) : (
            <div className="grid gap-6">
              {cartItems.map((item, index) => (
                <Card key={index}>
                  <CardContent className="p-4">
                    <div className="flex items-start gap-4">
                      {/* Product Image */}
                      <div className="w-24 h-24 md:w-32 md:h-32 flex-shrink-0">
                        <img
                          src={item.ProductImages[0]?.imageUrl || "/api/placeholder/150/150"}
                          alt={item.name}
                          className="w-full h-full object-cover rounded-lg shadow-sm"
                        />
                      </div>

                      {/* Product Details */}
                      <div className="flex-1">
                        <div className="flex justify-between items-start">
                          <h3 className="font-semibold text-lg text-slate-900">
                            {item.name}
                          </h3>
                          <button
                            onClick={() => removeFromCart(item.id)}
                            className="rounded-full hover:bg-red-100 transition-colors group/btn p-2"
                          >
                            <Trash className="w-5 h-5  group-hover/btn:text-red-600 transition-colors" />
                          </button>
                        </div>

                        {/* Quantity Controls */}
                        <div className="flex items-center mt-4 space-x-4">
                          <div className="flex items-center">
                            <Button
                              variant="outline"
                              size="icon"
                              className="rounded-full"
                              onClick={() => decreaseAmount(item.id)}
                            >
                              <Minus className="w-4 h-4" />
                            </Button>
                            <span className="px-4 py-2 font-medium text-slate-700">
                              {item.quantity}
                            </span>
                            <Button
                              variant="outline"
                              size="icon"
                              className="rounded-full"
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
              <CardContent className="p-6">
                <div className="flex items-center gap-2 mb-4">
                  <Truck className="w-5 h-5" />
                  <h2 className="text-xl font-semibold">Order Summary</h2>
                </div>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-slate-600">Subtotal</span>
                    <span className="font-medium">THB {totalPrice}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-600">Shipping</span>
                    <span className="text-slate-600">Calculated at checkout</span>
                  </div>
                  <div className="border-t pt-3">
                    <div className="flex justify-between">
                      <span className="font-semibold">Total</span>
                      <span className="font-semibold text-xl">THB {totalPrice}</span>
                    </div>
                  </div>
                </div>

                <button
                  className="w-full mt-6 bg-gradient-to-r from-blue-500 to-indigo-600 text-white py-3 rounded-lg font-medium hover:from-blue-600 hover:to-indigo-700 transition-colors focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
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
