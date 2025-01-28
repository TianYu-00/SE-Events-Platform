import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { verifyPayment } from "../api";
import { useUser, useAuth } from "@clerk/clerk-react";
import Lottie from "lottie-react";
import successAnimation from "../assets/lotties/Animation_Success - 1737087525207.json";
import failAnimation from "../assets/lotties/Animation_Fail - 1737087453027.json";
import { toast } from "react-toastify";
import useErrorChecker from "../hooks/useErrorChecker";
import PageLoader from "../components/PageLoader";

function Landing_PaymentCompletion() {
  const checkError = useErrorChecker();
  const { getToken } = useAuth();

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
        setIsLoading(true);
        const token = await getToken();
        const response = await verifyPayment({ paymentIntentId: paymentIntentId, userId: user.id, token: token });
        // console.log(response.data);
        setPaymentData(response.data);
        if (response.data?.status === "succeeded") {
          setPaymentMessage("Payment successful");
        } else if (response.data?.status === "requires_payment_method") {
          setPaymentMessage("Payment declined");
        } else {
          setPaymentMessage(response.data?.metadata?.failure_message);
        }
      } catch (error) {
        checkError(error);
        const errorCode = error.response?.data?.code;
        if (
          errorCode === "UNAUTHORISED_ACCESS" ||
          errorCode === "INTERNAL_SERVER_ERROR" ||
          errorCode === "RESOURCE_NOT_FOUND"
        ) {
          navigate("/");
        }
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

  return (
    <PageLoader isLoading={isLoading} message="verifying payment">
      <div className="text-copy-primary w-full min-h-[calc(100vh-5rem)] flex justify-center items-center flex-col">
        <div className="w-40">
          {paymentData?.status === "succeeded" ? (
            <Lottie animationData={successAnimation} loop autoplay />
          ) : (
            <Lottie animationData={failAnimation} loop autoplay />
          )}
        </div>
        <h2 className="font-bold text-xl">{paymentMessage}</h2>
        {paymentData?.status === "succeeded" ? (
          <button
            className="p-2 bg-cta text-cta-text rounded-md hover:bg-cta-active mt-6"
            onClick={() => navigate("/", { replace: true })}
          >
            Return To Home
          </button>
        ) : (
          <button
            className="p-2 bg-cta text-cta-text rounded-md hover:bg-cta-active mt-6"
            onClick={() => navigate(`/payment?event_id=${paymentData?.metadata?.event_id}`, { replace: true })}
          >
            Try again
          </button>
        )}
      </div>
    </PageLoader>
  );
}

export default Landing_PaymentCompletion;
