import React, { useState, useEffect } from "react";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import CheckoutForm from "../components/CheckoutForm";
import { createPayment, getEvent } from "../api";
import { useLocation, useNavigate } from "react-router-dom";
import { useTheme } from "../context/ThemeContext";
import { useUser, useAuth } from "@clerk/clerk-react";

import { toast } from "react-toastify";
import useErrorChecker from "../hooks/useErrorChecker";
import PageLoader from "../components/PageLoader";

// Stripe
const STRIPE_PUBLISHABLE_KEY = import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY;
const stripePromise = loadStripe(STRIPE_PUBLISHABLE_KEY);

function Landing_Payment() {
  const checkError = useErrorChecker();
  const { getToken } = useAuth();

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

  const { user } = useUser();

  const [isLoadingEvent, setIsLoadingEvent] = useState(true);
  const [isLoadingPaymentIntent, setIsLoadingPaymentIntent] = useState(true);

  useEffect(() => {
    const getEventDetails = async () => {
      try {
        setIsLoadingEvent(true);
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
        checkError(error);
        if (errorCode === "EVENT_NOT_FOUND" || errorCode === "INVALID_PARAMS" || clientErrorCode === "OUTDATED_EVENT") {
          navigate(`/`);
        }
      } finally {
        setIsLoadingEvent(false);
      }
    };

    getEventDetails();
  }, []);

  useEffect(() => {
    const runCreatePaymentIntent = async () => {
      try {
        setIsLoadingPaymentIntent(true);
        const token = await getToken();
        const response = await createPayment({ eventId: eventId, userId: user.id, token: token });
        // console.log(response);
        setClientSecret(response.data.clientSecret);
        setEventPrice(response.data.price);
      } catch (error) {
        checkError(error);
        const errorCode = error.response.data.code;
        if (errorCode === "NO_TICKETS_AVAILABLE") {
          navigate(`/`);
        }
      } finally {
        setIsLoadingPaymentIntent(false);
      }
    };

    if (event && user) {
      runCreatePaymentIntent();
    }
  }, [event, user]);

  return (
    <PageLoader isLoading={isLoadingEvent || isLoadingPaymentIntent} message="creating payment intent">
      <div className="w-full min-h-[calc(100vh-5rem)] flex justify-center items-center">
        <div className="w-full h-full">
          {clientSecret && stripePromise && eventPrice && (
            <Elements stripe={stripePromise} options={elementOptions}>
              <CheckoutForm eventPrice={eventPrice} eventName={event.event_name} />
            </Elements>
          )}
        </div>
      </div>
    </PageLoader>
  );
}

export default Landing_Payment;
