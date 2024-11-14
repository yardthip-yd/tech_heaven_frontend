import React, { useState, useEffect } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import { stripeApi } from "@/API/stripe-api";
import useAuthStore from "@/stores/authStore";
import CheckoutForm from "@/components/payment/CheckoutForm";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ShoppingBag, Package, CreditCard, Tag, Truck } from "lucide-react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import useAddressStore from "@/stores/addressStore";
import useCartStore from "@/stores/cartStore";

const stripePromise = loadStripe(
  "pk_test_51QGAMTELH1fq6Tmu7Xaz1rROW2MVJaFwzpfDQUZwedBoszrmUk2zwr5DZ80QgJKBIT6vXki7Dnh2IeKftlchuuk100DI5LWtM0"
);

const Payment = () => {
  const cartTotal = useCartStore((state) => state.cartTotal);
  const cartItems = useCartStore((state) => state.cartItems);
  const discount = useCartStore((state) => state.discount);
  const getCart1 = useCartStore((state) => state.getCart1);
  const navigate = useNavigate();
  const applyCoupon1 = useCartStore((state) => state.applyCoupon1);
  const user = useAuthStore((state) => state.user);
  const token = useAuthStore((state) => state.token);
  const address = useAddressStore((state) => state.address);
  const actionAddAddress = useAddressStore((state) => state.actionAddAddress);
  const [addressData, setAddressData] = useState({
    address: "",
    userId: user?.id || "",
  });

  const [promotionCode, setPromotionCode] = useState("");
  const [selectedAddress, setSelectedAddress] = useState(null);

  const totalPriceBeforeDiscount =
    cartItems.length > 0
      ? cartItems.reduce((total, item) => {
          return total + Number(item.price) * Number(item.quantity);
        }, 0)
      : 0;

  const totalPriceAfterDiscount = (
    totalPriceBeforeDiscount -
    totalPriceBeforeDiscount * (discount / 100)
  ).toLocaleString("en-US", { minimumFractionDigits: 2 });

  const actionGetAllAddress = useAddressStore(
    (state) => state.actionGetAllAddress
  );
  const actionUpdateAddress = useAddressStore(
    (state) => state.actionUpdateAddress
  );
  const actionDeleteAddress = useAddressStore(
    (state) => state.actionDeleteAddress
  );
  const [clientSecret, setClientSecret] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    getCart1(user.id);
  }, [user]);

  useEffect(() => {
    if (token) {
      actionGetAllAddress(token);
    }
  }, [token, actionGetAllAddress]);

  useEffect(() => {
    if (token) {
      console.log("Fetching address for token:", token);
      actionGetAllAddress(token);
    }
  }, [token, actionGetAllAddress]);

  useEffect(() => {
    if (!token) return;
    stripeApi(token)
      .then((res) => {
        setClientSecret(res.data.clientSecret);
        setLoading(false);
      })
      .catch((err) => {
        setError("Failed to fetch payment information. Please try again.");
        setLoading(false);
      });
  }, [token, actionGetAllAddress]);

  const appearance = { theme: "stripe" };

  const handleApplyPromotion = async () => {
    try {
      const result = await applyCoupon1(promotionCode);
      if (result?.discount) {
        getCart1(user.id);
        toast.success("Promotion code applied successfully!");
      } else {
        toast.error("Invalid promotion code.");
      }
    } catch (err) {
      toast.error(err || "Failed to apply promotion code. Please try again.");
    }
  };

  const handleAddAddress = async () => {
    try {
      if (!addressData.address) {
        toast.error("กรุณากรอกที่อยู่");
        return;
      }

      if (!user?.id) {
        toast.error("กรุณาเข้าสู่ระบบ");
        return;
      }

      const dataToSend = {
        address: addressData.address,
        userId: user.id,
      };
      console.log(dataToSend);
      const result = await actionAddAddress(token, dataToSend);
      console.log(result, "Check result");

      if (result) {
        await actionGetAllAddress(token);
        setAddressData((prev) => ({ ...prev, address: "" }));
        toast.success("เพิ่มที่อยู่สำเร็จ");
      }
    } catch (err) {
      console.error("Error details:", err);
      toast.error(err.message || "ไม่สามารถเพิ่มที่อยู่ได้");
    }
  };

  const handleUpdateAddress = () => {
    try {
      actionUpdateAddress(selectedAddress, data.address);
      actionGetAllAddress(token);
      setSelectedAddress(null);
    } catch (err) {
      console.error(err);
    }
  };
  const handleAddressSelect = (e) => {
    const addressId = e.target.value;
    console.log('Selected address:', addressId);
    setSelectedAddress(addressId);
  };

  if (error) {
    toast.error(error);
  }
  return (
    <div className="bg-gradient-to-b from-gray-50 to-gray-100 p-4 md:p-8 overflow-y-auto max-h-[80vh]">
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      <div className="max-w-4xl mx-auto space-y-6 h-full">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Checkout</h1>
          <Button
            variant="ghost"
            onClick={() => navigate("/store")}
            className="flex items-center gap-2"
          >
            <ShoppingBag className="w-4 h-4" />
            Continue Shopping
          </Button>
        </div>

        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Package className="w-5 h-5" />
              Order Items
            </CardTitle>
          </CardHeader>
          <CardContent>
            {cartItems.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-12">
                <ShoppingBag className="w-16 h-16 text-gray-300 mb-4" />
                <p className="text-gray-500 text-lg mb-4">Your cart is empty</p>
                <Button variant="default" onClick={() => navigate("/store")}>
                  Start Shopping
                </Button>
              </div>
            ) : (
              <div className="space-y-4">
                {cartItems.map((item) => (
                  <div
                    key={item.id}
                    className="flex items-start gap-4 p-4 bg-white rounded-lg border border-gray-100 hover:shadow-md transition-shadow"
                  >
                    <div className="w-24 h-24 md:w-32 md:h-32 flex-shrink-0 overflow-hidden rounded-lg">
                      <img
                        src={
                          item.ProductImages[0]?.imageUrl ||
                          "https://via.placeholder.com/150"
                        }
                        alt={item.name}
                        className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-200"
                      />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-lg text-gray-900 mb-1">
                        {item.name}
                      </h3>
                      <p className="text-gray-600 text-sm mb-3">
                        {item.description}
                      </p>
                      <div className="flex justify-between items-center">
                        <p className="text-lg font-medium text-blue-600">
                          THB{" "}
                          {(item?.price * item?.quantity).toLocaleString(
                            "en-US",
                            { minimumFractionDigits: 2 }
                          )}
                        </p>
                        <span className="px-3 py-1 bg-gray-100 rounded-full text-sm text-gray-700">
                          Qty: {item?.quantity}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
        <div className="flex flex-col gap-6">
          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Truck className="w-5 h-5" />
                Order Summary
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Subtotal</span>
                  <span className="font-medium">
                    THB {totalPriceBeforeDiscount}
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Discount</span>
                  <span className="font-medium text-red-600">
                    {" "}
                    {discount.toFixed(2)}
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Shipping</span>
                  <span className="text-gray-600">Calculated at checkout</span>
                </div>
                {address && address.length > 0 ? (
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Shipping Address</span>
                    <div className="flex gap-2">
                      <select
                        name="address"
                        value={selectedAddress || ""}
                        onChange={handleAddressSelect}
                        className="flex-1 p-2 border rounded"
                      >
                        <option value="">Select Address</option>
                        {address.map((addr) => (
                          <option key={addr.id} value={addr.id}>
                            {addr.address}
                          </option>
                        ))}
                      </select>
                      <Button
                        onClick={() =>
                          setAddressData((prev) => ({ ...prev, address: "" }))
                        }
                      >
                        Add New
                      </Button>
                    </div>
                  </div>
                ) : (
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Shipping Address</span>
                    <Input
                      value={addressData.address}
                      onChange={(e) =>
                        setAddressData((prev) => ({
                          ...prev,
                          address: e.target.value,
                        }))
                      }
                      placeholder="กรุณากรอกที่อยู่"
                      className="flex-1"
                    />
                    <Button onClick={handleAddAddress}>Add Address</Button>
                  </div>
                )}
                {selectedAddress && (
                  <div className="flex justify-between">
                    <Button onClick={handleUpdateAddress}>
                      Update Address
                    </Button>
                  </div>
                )}
                <div className="pt-3 border-t">
                  <div className="flex justify-between items-center">
                    <span className="font-semibold">Total</span>
                    <span className="font-bold text-xl text-blue-600">
                      THB {cartTotal}
                    </span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Tag className="w-5 h-5" />
                Promotion Code
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex gap-3 items-center justify-center">
                <Input
                  type="text"
                  placeholder="Enter promotion code"
                  value={promotionCode}
                  onChange={(e) => setPromotionCode(e.target.value)}
                  className="flex-1"
                />
                <Button onClick={handleApplyPromotion} variant="default">
                  Apply
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <CreditCard className="w-5 h-5" />
              Payment Details
            </CardTitle>
          </CardHeader>
          <CardContent>
            {clientSecret && (
              <Elements
                options={{ clientSecret, appearance }}
                stripe={stripePromise}
              >
                <CheckoutForm
                  selectedAddressId={selectedAddress}
                  onAddressError={() =>
                    toast.error("กรุณาเลือกที่อยู่จัดส่งก่อนชำระเงิน")
                  }
                  amount={cartTotal}
                  currency="thb"
                />
              </Elements>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Payment;
