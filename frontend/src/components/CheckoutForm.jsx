import React, { useState } from "react";
import { useStripe, useElements, PaymentElement } from "@stripe/react-stripe-js";
import { moneyFormatter } from "../utils/MoneyFormatter";

const CheckoutForm = ({ eventPrice, eventName }) => {
  const stripe = useStripe();
  const elements = useElements();
  // https://docs.stripe.com/payments/payment-element
  const paymentElementOptions = {
    layout: "tabs", // tabs or accordion
  };

  const [message, setMessage] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!stripe || !elements) {
      return;
    }
    setIsProcessing(true);

    const { error } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: `${window.location.origin}/payment/completion`,
      },
    });

    if (error.type === "card_error" || error.type === "validation_error") {
      setMessage(error.message);
    } else {
      setMessage("An unexpected error occurred.");
    }

    setIsProcessing(false);
  };

  return (
    <div className="w-full h-full flex flex justify-center items-center text-copy-primary">
      <form
        onSubmit={handleSubmit}
        className="flex justify-center items-center flex-col space-y-10 md:border md:border-border/30 p-10 rounded-md w-full md:w-5/12 shadow-lg bg-card"
      >
        <div className="flex justify-center items-center flex-col">
          <h2 className="font-semibold text-3xl">Payment Form</h2>
          <p className="font-semibold">{eventName}</p>
          <p className="font-semibold">£{moneyFormatter(eventPrice)}</p>
        </div>

        <PaymentElement className="w-full" options={paymentElementOptions} />
        <button
          disabled={isProcessing || !stripe || !elements}
          className="p-2 bg-cta rounded-md text-cta-text w-40 hover:bg-cta-active"
        >
          <span id="button-text">{isProcessing ? "Processing ... " : "Pay now"}</span>
        </button>
        {message && <div className="text-red-500 text-sm">{message}</div>}
      </form>
    </div>
  );
};

export default CheckoutForm;

/* For testing purposes */
/* <div className="text-xs grid grid-cols-2 gap-2 border border-border/30">
          <div className="border-b border-r border-gray-300 p-2">
            <span className="text-green-500">Test Success Card:</span>
          </div>
          <div className="border-b border-gray-300 p-2">
            <span className="text-red-500">Test Decline Card:</span>
          </div>
          <div className="border-b border-r border-gray-300 p-2">4000008260000000</div>
          <div className="border-b border-gray-300 p-2">4000000000000002</div>

          <div className="col-span-2 text-center p-2">
            <a
              href="https://docs.stripe.com/testing?testing-method=card-numbers"
              className="text-blue-500 underline italic"
              target="_blank"
              rel="noopener noreferrer"
            >
              Click me for other cards
            </a>
          </div>
        </div> */
