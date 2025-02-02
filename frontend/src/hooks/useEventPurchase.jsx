import { useNavigate } from "react-router-dom";
import { useUser, useAuth } from "@clerk/clerk-react";
import { createFreePurchase } from "../api";
import { toast } from "react-toastify";
import useErrorChecker from "../hooks/useErrorChecker";

// Custom Hook to handle event purchase logic
export const useEventPurchase = (event) => {
  const navigate = useNavigate();
  const { user } = useUser();
  const { getToken } = useAuth();

  const purchaseEvent = async () => {
    const checkError = useErrorChecker();

    if (user === null) {
      navigate("/auth-signin");
    } else {
      if (new Date(event.event_start_date) >= new Date()) {
        if (event.event_cost_in_pence > 0 && event.event_cost_in_pence > 30) {
          navigate(`/payment?event_id=${event.event_id}`);
        } else if (event.event_cost_in_pence < 30 && event.event_cost_in_pence > 0) {
          toast.warn("Please contact support to update the price of this ticket to not be between 1-30 pence");
        } else {
          try {
            const token = await getToken();
            const response = await createFreePurchase({
              userId: user.id,
              eventName: event.event_name,
              eventId: event.event_id,
              token: token,
            });
            toast.success(response.msg);
          } catch (error) {
            checkError(error);
          }
        }
      } else {
        toast.warn("Event has ended, you can not purchase or sign up for this event anymore");
      }
    }
  };

  return purchaseEvent;
};
