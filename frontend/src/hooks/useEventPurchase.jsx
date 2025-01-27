import { useNavigate } from "react-router-dom";
import { useUser } from "@clerk/clerk-react";
import { createFreePurchase } from "../api";

// Custom Hook to handle event purchase logic
export const useEventPurchase = (event) => {
  const navigate = useNavigate();
  const { user } = useUser();

  const purchaseEvent = async () => {
    if (user === null) {
      navigate("/auth-signin");
    } else {
      if (new Date(event.event_start_date) >= new Date()) {
        if (event.event_cost_in_pence > 0 && event.event_cost_in_pence > 30) {
          navigate(`/payment?event_id=${event.event_id}`);
        } else if (event.event_cost_in_pence < 30 && event.event_cost_in_pence > 0) {
          console.log("CONTACT SUPPORT TO UPDATE THE PRICE OF TICKETS TO BE ABOVE 30 PENCE");
        } else {
          const response = await createFreePurchase({
            userId: user.id,
            eventName: event.event_name,
            eventId: event.event_id,
          });
          console.log(response);
        }
      } else {
        console.error("Event has ended, you can not purchase or sign up for this event anymore");
      }
    }
  };

  return purchaseEvent;
};
