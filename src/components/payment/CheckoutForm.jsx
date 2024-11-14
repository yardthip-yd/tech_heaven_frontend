import React, { useState } from "react";
import {
  PaymentElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import { Loader2 } from "lucide-react";
import useOrderStore from "@/stores/orderStore";
import useAuthStore from "@/stores/authStore";
import useCartStore from "@/stores/cartStore";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

<<<<<<< HEAD
export default function CheckoutForm({ dpmCheckerLink, selectedAddressId, onAddressError }) {
=======

export default function CheckoutForm({ dpmCheckerLink }) {
>>>>>>> 0a521668673868ba634c00c86584bcccf05c192c
  const actionCreateOrder = useOrderStore((state) => state.actionCreateOrder);
  const stripe = useStripe();
  const elements = useElements();
  const navigate = useNavigate();
  const token = useAuthStore((state) => state.token);
<<<<<<< HEAD
=======
  const clearCart = useCartStore((state) => state.clearCart);

>>>>>>> 0a521668673868ba634c00c86584bcccf05c192c
  const [isLoading, setIsLoading] = useState(false);
  const clearCart = useCartStore((state) => state.clearCart);
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // เพิ่ม log เพื่อดูค่า
    console.log('Selected Address ID:', selectedAddressId);
    
    if (!selectedAddressId) {
      toast.error("กรุณาเลือกที่อยู่จัดส่งก่อนชำระเงิน");
      return;
    }
  
    if (!stripe || !elements) return;
    
    setIsLoading(true);
    const timeout = setTimeout(() => {
      setIsLoading(false);
      toast.error("Payment process timed out. Please try again.");
    }, 30000);
  
    try {
      const payload = await stripe.confirmPayment({
        elements,
        redirect: "if_required",
      });
  
      clearTimeout(timeout);
      
      // เพิ่ม log เพื่อดูค่า payload
      console.log('Payment Payload:', payload);
      
      if (payload.error) {
        toast.error(payload.error.message);
        console.log("Error:", payload.error.message);
      } else if (payload.paymentIntent.status === "succeeded") {
        setIsLoading(false);
<<<<<<< HEAD
        
        // สร้าง orderData ที่จะส่งไป
        const orderData = {
          paymentIntent: payload.paymentIntent,
          addressId: Number(selectedAddressId), // แปลงเป็นตัวเลข
        };
  
        console.log('Order Data:', orderData);
  
        // ส่งข้อมูลไปสร้าง order
        const result = await actionCreateOrder(token, orderData);
        console.log('Create Order Result:', result);
  
        if (result) {
          localStorage.removeItem("cartItems"); 
          clearCart(); 
          navigate("/user/purchase");
          toast.success("ชำระเงินสำเร็จ");
        }
=======
        await actionCreateOrder(token, payload);
        clearCart()
        navigate("/user/purchase");
>>>>>>> 0a521668673868ba634c00c86584bcccf05c192c
      }
    } catch (err) {
      clearTimeout(timeout);
      console.error('Error details:', err);
      toast.error(err.message || "เกิดข้อผิดพลาดในการสร้างคำสั่งซื้อ");
    }
    
    setIsLoading(false);
  };

  return (
    <div className="mx-auto ">
      <form 
        id="payment-form" 
        onSubmit={handleSubmit}
        className="space-y-6"
      >
        <div className="bg-slate-50 p-6 rounded-lg border border-slate-200">
          <PaymentElement
            id="payment-element"
            options={{ layout: "tabs" }}
          />
        </div>

        <button
          disabled={isLoading || !stripe || !elements || !selectedAddressId} // เพิ่มเงื่อนไข !selectedAddressId
          className={`w-full py-3 px-6 rounded-lg text-white font-medium text-lg
            ${isLoading || !stripe || !elements || !selectedAddressId
              ? 'bg-slate-400 cursor-not-allowed'
              : 'bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 active:bg-blue-800'
            } transition-colors duration-200 flex items-center justify-center`}
        >
          {isLoading ? (
            <>
              <Loader2 className="w-5 h-5 animate-spin mr-2" />
              Processing...
            </>
          ) : (
            'Pay Now'
          )}
        </button>
      </form>

      <div className="mt-8 text-center text-sm text-slate-600">
        <p className="leading-relaxed">
          Payment methods are dynamically displayed based on customer location,
          order amount, and currency.{' '}
          <br />
          <a
            href={dpmCheckerLink}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 hover:text-blue-800 underline"
          >
            Preview payment methods by transaction
          </a>
        </p>
      </div>
    </div>
  );
}
