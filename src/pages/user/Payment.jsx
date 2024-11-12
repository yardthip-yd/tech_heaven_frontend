import React, { useState, useEffect } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import { stripeApi } from "@/API/stripe-api";
import useAuthStore from "@/stores/authStore";
import CheckoutForm from "@/components/user/CheckoutForm";
import { useLocation } from "react-router-dom"; // Import useLocation hook
import useAddressStore from "@/stores/addressStore"

const stripePromise = loadStripe(
  "pk_test_51QGAMTELH1fq6Tmu7Xaz1rROW2MVJaFwzpfDQUZwedBoszrmUk2zwr5DZ80QgJKBIT6vXki7Dnh2IeKftlchuuk100DI5LWtM0"
);

const Payment = () => {
  const { state } = useLocation();
  const cartItems = state?.cartItems || [];
  const totalPrice = cartItems
    .reduce((total, item) => total + item.price * item.quantity, 0)
    .toFixed(2);

  const token = useAuthStore((state) => state.token);
  const address = useAddressStore((state) => state.address)
  const actionAddAddress = useAddressStore((state) => state.actionAddAddress)
  const actionGetAllAddress = useAddressStore((state) => state.actionGetAllAddress)
  const actionUpdateAddress = useAddressStore((state) => state.actionUpdateAddress)
  const actionDeleteAddree = useAddressStore((state) => state.actionDeleteAddress)
  const [clientSecret, setClientSecret] = useState("");
  const [loading, setLoading] = useState(true); // Add loading state
  const [error, setError] = useState(null); // Add error state

  useEffect((token) => {
    actionGetAllAddress(token)
  }, [])

  useEffect((token) => {
    actionGetAllAddress(token)
    console.log(address)
  }, [actionGetAllAddress, actionUpdateAddress])

  useEffect(() => {
    if (!token) return; // Avoid making the API call if token is not available

    // Fetch the clientSecret from the server
    stripeApi(token)
      .then((res) => {
        setClientSecret(res.data.clientSecret);
        setLoading(false); // Set loading to false once clientSecret is fetched
      })
      .catch((err) => {
        console.log(err);
        setError("Failed to fetch payment information. Please try again.");
        setLoading(false);
      });
  }, [token]);

  const appearance = {
    theme: "stripe",
  };

  // Loader content while waiting for the API response
  if (loading) {
    return (
      <div className="flex justify-center items-center h-full">
        <p>Loading payment details...</p>
      </div>
    );
  }

  // Error content if the API fails
  if (error) {
    return (
      <div className="flex justify-center items-center h-full">
        <p className="text-red-500">{error}</p>
      </div>
    );
  }

  return (
    <div className="flex flex-row m-10">
      <div className="w-1/2 p-4">
      {address.map((item) => (
        <div>
          <p>{item.address}</p>
        </div>
      ))}
        <h3 className="text-xl font-bold">Your Cart</h3>
        {cartItems.length === 0 ? (
          <p>Your cart is empty!</p>
        ) : (
          cartItems.map((item) => (
            <div key={item.id} className="flex flex-row gap-4 my-4">
              <div className="w-24 h-24">
                <img
                  src={item.ProductImages[0]?.imageUrl || "https://via.placeholder.com/150"}
                  alt={item.name}
                  className="w-full h-full object-cover rounded"
                />
              </div>
              <div className="flex flex-col justify-between">
                <h4>{item.name}</h4>
                <p>{item.description}</p>
                <div className="flex h-1/2 items-end">
                  <p>${item.price}</p>
                </div>
              </div>
            </div>
          ))
        )}
        <div className="flex flex-row justify-between">
          <span className="font-bold text-xl">Total</span>
          <span>${totalPrice}</span>
        </div>
      </div>

      <div className="flex flex-col w-1/2">
        {clientSecret && (
          <Elements
            options={{ clientSecret, appearance }}
            stripe={stripePromise}
          >
            <CheckoutForm />
          </Elements>
        )}
      </div>
    </div>
  );
};

export default Payment;
