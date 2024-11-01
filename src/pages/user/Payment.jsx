import React, { useState, useEffect } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import { stripeApi } from "@/API/stripe-api";
import useAuthStore from "@/stores/authStore";
import CheckoutForm from "@/components/user/CheckoutForm";

const stripePromise = loadStripe(
  "pk_test_51QGAMTELH1fq6Tmu7Xaz1rROW2MVJaFwzpfDQUZwedBoszrmUk2zwr5DZ80QgJKBIT6vXki7Dnh2IeKftlchuuk100DI5LWtM0"
);

const Payment = () => {
  const token = useAuthStore((state) => state.token);
  const [clientSecret, setClientSecret] = useState("");

  useEffect(() => {
    stripeApi(token)
      .then((res) => {
        console.log(res);
        setClientSecret(res.data.clientSecret);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const appearance = {
    theme: 'stripe',
  };
  // Enable the skeleton loader UI for optimal loading.
  const loader = 'auto';

  return <div>
    { clientSecret && (
      <Elements options={{clientSecret, appearance, loader}} stripe={stripePromise}>
        <CheckoutForm />
      </Elements>
    )}
  </div>;
};

export default Payment;
