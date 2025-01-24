import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { verifyPayment } from "../api";
import { useUser } from "@clerk/clerk-react";
import Lottie from "lottie-react";
import successAnimation from "../assets/lotties/Animation_Success - 1737087525207.json";
import failAnimation from "../assets/lotties/Animation_Fail - 1737087453027.json";

function Landing_PaymentCompletion() {
  const { user } = useUser();
  const location = useLocation();
  const navigate = useNavigate();
  const queryParams = new URLSearchParams(location.search);
  const paymentIntentId = queryParams.get("payment_intent");
  const [paymentData, setPaymentData] = useState(null);
  const [paymentMessage, setPaymentMessage] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const verifyPaymentSuccessful = async () => {
      try {
        const response = await verifyPayment({ paymentIntentId: paymentIntentId, userId: user.id });
        console.log(response.data);
        setPaymentData(response.data);
        if (response.data.status === "succeeded") {
          setPaymentMessage("Payment successful");
        } else if (response.data.status === "requires_payment_method") {
          setPaymentMessage("Payment declined");
        } else {
          setPaymentMessage(response.data?.metadata?.failure_message);
        }
      } catch (error) {
        if (error.response?.data?.code === "UNAUTHORISED_ACCESS") {
          navigate("/");
        }
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    };

    if (user === null || paymentIntentId === null) {
      navigate("/");
    } else if (user && paymentIntentId) {
      verifyPaymentSuccessful();
    }
  }, [user, paymentIntentId]);

  if (isLoading) {
    return <>{console.log("Loading")}</>;
  }

  return (
    <div className="text-copy-primary w-full min-h-[calc(100vh-5rem)] flex justify-center items-center flex-col">
      <div className="w-40">
        {paymentData.status === "succeeded" ? (
          <Lottie animationData={successAnimation} loop autoplay />
        ) : (
          <Lottie animationData={failAnimation} loop autoplay />
        )}
      </div>
      <h2 className="font-bold text-xl">{paymentMessage}</h2>
      {paymentData.status === "succeeded" ? (
        <button
          className="p-2 bg-cta text-cta-text rounded-md hover:bg-cta-active mt-6"
          onClick={() => navigate("/", { replace: true })}
        >
          Return To Home
        </button>
      ) : (
        <button
          className="p-2 bg-cta text-cta-text rounded-md hover:bg-cta-active mt-6"
          onClick={() => navigate(`/payment?event_id=${paymentData.metadata.event_id}`, { replace: true })}
        >
          Try again
        </button>
      )}
    </div>
  );
}

export default Landing_PaymentCompletion;
