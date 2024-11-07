import React, { useState } from "react";
import {
  PaymentElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import "../../stripe.css";
import useOrderStore from "@/stores/orderStore";
import useAuthStore from "@/stores/authStore";

export default function CheckoutForm({ dpmCheckerLink }) {
  const actionCreateOrder = useOrderStore((state) => state.actionCreateOrder);
  const stripe = useStripe();
  const elements = useElements();

  const [message, setMessage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const token = useAuthStore((state) => state.token);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!stripe || !elements) {
      return;
    }
    setIsLoading(true);
    const timeout = setTimeout(() => {
      setIsLoading(false);
      setMessage("Payment process timed out. Please try again.");
    }, 30000);

    try {
      const payload = await stripe.confirmPayment({
        elements,
        redirect: "if_required",
      });

      clearTimeout(timeout);
      console.log(payload);
      console.log(payload.paymentIntent.status);
      if (payload.error) {
        setMessage(payload.error.message);
        console.log("Error:", payload.error.message);
      } else if (payload.paymentIntent.status === "succeeded") {
        console.log("Payment succeeded!");
        setIsLoading(false);
        const orderResponse = await actionCreateOrder(token, payload);
      }
    } catch (err) {
      clearTimeout(timeout);
      setMessage("There was an error processing the payment.");
      console.log("Error in Order Creation:", err);
      setIsLoading(false);
    }

    setIsLoading(false);
  };
  console.log(isLoading);

  const paymentElementOptions = {
    layout: "tabs",
  };

  return (
    <>
      <form
        id="payment-form"
        onSubmit={handleSubmit}
        className="stripe-form space-y-6"
      >
        <PaymentElement id="payment-element" options={paymentElementOptions} />
        <button
          disabled={isLoading || !stripe || !elements}
          id="submit"
          className="stripe-button"
        >
          <span id="button-text">
            {isLoading ? (
              <div className="spinner" id="spinner"></div>
            ) : (
              "Pay now"
            )}
          </span>
        </button>
        {message && <div id="payment-message">{message}</div>}
      </form>
      <div id="dpm-annotation">
        <p>
          Payment methods are dynamically displayed based on customer location,
          order amount, and currency.&nbsp;
          <a
            href={dpmCheckerLink}
            target="_blank"
            rel="noopener noreferrer"
            id="dpm-integration-checker"
          >
            Preview payment methods by transaction
          </a>
        </p>
      </div>
    </>
  );
}
