import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { verifyPayment } from "../api";
import { useUser } from "@clerk/clerk-react";

function Landing_PaymentCompletion() {
  const { user } = useUser();
  const location = useLocation();
  const navigate = useNavigate();
  const queryParams = new URLSearchParams(location.search);
  const paymentIntentId = queryParams.get("payment_intent");
  const [paymentData, setPaymentData] = useState(null);
  const [paymentMessage, setPaymentMessage] = useState("");

  useEffect(() => {
    const verifyPaymentSuccessful = async () => {
      try {
        const response = await verifyPayment({ paymentIntentId: paymentIntentId, userId: user.id });
        console.log(response);
        setPaymentData(response.data);
        if (response.data.status === "succeeded") {
          setPaymentMessage("Payment successful");
        } else if (response.data.status === "requires_payment_method") {
          setPaymentMessage("Payment declined");
        }
      } catch (error) {
        if (error.response.data.code === "UNAUTHORISED_ACCESS") {
          navigate("/");
        }
        console.error(error);
      }
    };

    if (user === null || paymentIntentId === null) {
      navigate("/");
    } else if (user && paymentIntentId) {
      verifyPaymentSuccessful();
      console.log("user id", user.id);
      console.log("payment intent", paymentIntentId);
    }
  }, [user, paymentIntentId]);

  return <div className="text-copy-primary">{paymentMessage}</div>;
}

export default Landing_PaymentCompletion;
