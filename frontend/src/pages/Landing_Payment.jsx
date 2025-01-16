import React, { useState, useEffect } from "react";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import CheckoutForm from "../components/CheckoutForm";
import { createPayment } from "../api";
const STRIPE_PUBLISHABLE_KEY = import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY;
const stripePromise = loadStripe(STRIPE_PUBLISHABLE_KEY);

function Landing_Payment() {
  const [clientSecret, setClientSecret] = useState(null);
  const appearance = { theme: "stripe" };
  const elementOptions = { clientSecret, appearance };

  useEffect(() => {
    const runCreatePaymentIntent = async () => {
      try {
        const response = await createPayment(100);
        // console.log(response);
        setClientSecret(response.data);
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
