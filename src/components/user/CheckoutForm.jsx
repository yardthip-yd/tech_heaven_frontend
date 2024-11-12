import React, { useState } from "react";
import {
  PaymentElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import { Loader2 } from "lucide-react";
import useOrderStore from "@/stores/orderStore";
import useAuthStore from "@/stores/authStore";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function CheckoutForm({ dpmCheckerLink }) {
  const actionCreateOrder = useOrderStore((state) => state.actionCreateOrder);
  const stripe = useStripe();
  const elements = useElements();
  const navigate = useNavigate();
  const token = useAuthStore((state) => state.token);

  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
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
      
      if (payload.error) {
        toast.error(payload.error.message);
        console.log("Error:", payload.error.message);
      } else if (payload.paymentIntent.status === "succeeded") {
        setIsLoading(false);
        await actionCreateOrder(token, payload);
        navigate("/user/order-success");
      }
    } catch (err) {
      clearTimeout(timeout);
      toast.error("There was an error processing the payment.");
      console.log("Error in Order Creation:", err);
    }
    
    setIsLoading(false);
  };

  return (
    <div className="mx-auto ">
      <ToastContainer position="top-right" autoClose={3000} hideProgressBar={false} />
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
          disabled={isLoading || !stripe || !elements}
          className={`w-full py-3 px-6 rounded-lg text-white font-medium text-lg
            ${isLoading || !stripe || !elements 
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
