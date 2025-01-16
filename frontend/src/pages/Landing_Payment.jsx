import React, { useState, useEffect } from "react";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import CheckoutForm from "../components/CheckoutForm";
import { createPayment } from "../api";
import { useLocation } from "react-router-dom";

// Stripe
const STRIPE_PUBLISHABLE_KEY = import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY;
const stripePromise = loadStripe(STRIPE_PUBLISHABLE_KEY);

function Landing_Payment() {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const eventId = queryParams.get("event_id");

  const [clientSecret, setClientSecret] = useState(null);
  const appearance = { theme: "stripe" };
  const elementOptions = { clientSecret, appearance };

  useEffect(() => {
    const runCreatePaymentIntent = async () => {
      try {
        const response = await createPayment(eventId);
        // console.log(response);
        setClientSecret(response.data.clientSecret);
        console.log(response.data.price);
      } catch (error) {
        console.error(error);
      }
    };

    runCreatePaymentIntent();
  }, []);

  return (
    <div className="w-full bg-white h-[calc(100vh-5rem)]">
      {clientSecret && stripePromise && (
        <Elements stripe={stripePromise} options={elementOptions}>
          <CheckoutForm />
        </Elements>
      )}
    </div>
  );
}

export default Landing_Payment;
