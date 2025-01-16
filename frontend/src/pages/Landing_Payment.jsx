import React, { useState, useEffect } from "react";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import CheckoutForm from "../components/CheckoutForm";
import { createPayment, getEvent } from "../api";
import { useLocation, useNavigate } from "react-router-dom";
import { useTheme } from "../context/ThemeContext";

// Stripe
const STRIPE_PUBLISHABLE_KEY = import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY;
const stripePromise = loadStripe(STRIPE_PUBLISHABLE_KEY);

function Landing_Payment() {
  const navigate = useNavigate();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const eventId = queryParams.get("event_id");
  const { theme } = useTheme();

  const [clientSecret, setClientSecret] = useState(null);
  const appearance = { theme: theme === "dark" ? "night" : "stripe" };
  const elementOptions = { clientSecret, appearance };

  const [event, setEvent] = useState(null);
  const [eventPrice, setEventPrice] = useState(null);

  useEffect(() => {
    const getEventDetails = async () => {
      try {
        const response = await getEvent(eventId);
        setEvent(response.data);
        console.log("Found event");
      } catch (error) {
        const errorCode = error.response.data.code;
        if (errorCode === "EVENT_NOT_FOUND" || errorCode === "INVALID_PARAMS") {
          navigate(`/`);
        } else {
          console.error(error);
        }
      }
    };

    getEventDetails();
  }, []);

  useEffect(() => {
    const runCreatePaymentIntent = async () => {
      try {
        const response = await createPayment(eventId);
        // console.log(response);
        setClientSecret(response.data.clientSecret);
        setEventPrice(response.data.price);
      } catch (error) {
        console.error(error);
      }
    };

    if (event) {
      runCreatePaymentIntent();
    }
  }, [event]);

  return (
    <div className="w-full min-h-[calc(100vh-5rem)] flex justify-center items-center">
      <div className="w-full h-full">
        {clientSecret && stripePromise && eventPrice && (
          <Elements stripe={stripePromise} options={elementOptions}>
            <CheckoutForm eventPrice={eventPrice} eventName={event.event_name} />
          </Elements>
        )}
      </div>
    </div>
  );
}

export default Landing_Payment;
