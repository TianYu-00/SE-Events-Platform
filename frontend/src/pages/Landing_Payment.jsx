import React, { useState, useEffect } from "react";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import CheckoutForm from "../components/CheckoutForm";
import { createPayment, getEvent } from "../api";
import { useLocation, useNavigate } from "react-router-dom";
import { useTheme } from "../context/ThemeContext";
import { useUser } from "@clerk/clerk-react";
import Lottie from "lottie-react";
import failAnimation from "../assets/lotties/Animation_Fail - 1737087453027.json";

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
  const [isSoldOut, setIsSoldOut] = useState(false);

  const { user } = useUser();

  useEffect(() => {
    const getEventDetails = async () => {
      try {
        const response = await getEvent(eventId);
        if (new Date(response.data.event_start_date) <= new Date()) {
          const error = new Error("You can not purchase outdated events.");
          error.code = "OUTDATED_EVENT";
          throw error;
        }
        setEvent(response.data);
        console.log("Found event");
      } catch (error) {
        const errorCode = error.response?.data?.code;
        const clientErrorCode = error.code;

        if (errorCode === "EVENT_NOT_FOUND" || errorCode === "INVALID_PARAMS" || clientErrorCode === "OUTDATED_EVENT") {
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
        const response = await createPayment({ eventId: eventId, userId: user.id });
        // console.log(response);
        setClientSecret(response.data.clientSecret);
        setEventPrice(response.data.price);
      } catch (error) {
        console.error(error);
        const errorCode = error.response.data.code;
        if (errorCode === "NO_TICKETS_AVAILABLE") {
          setIsSoldOut(true);
        }
      }
    };

    if (event && user) {
      runCreatePaymentIntent();
    }
  }, [event, user]);

  if (isSoldOut) {
    return (
      <div className="text-copy-primary w-full min-h-[calc(100vh-5rem)] flex justify-center items-center flex-col">
        <div className="w-40">
          <Lottie animationData={failAnimation} loop autoplay />
        </div>
        <h2 className="font-bold text-xl">Oops! Looks like tickets for this event are all sold out!</h2>

        <button
          className="p-2 bg-cta text-cta-text rounded-md hover:bg-cta-active mt-6"
          onClick={() => navigate("/events", { replace: true })}
        >
          Return To Events
        </button>
      </div>
    );
  }

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
