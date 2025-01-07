import React from "react";
import { dateFormatter } from "./DateFormatter";
import { moneyFormatter } from "./MoneyFormatter";

function EventCard({ event }) {
  return (
    <div className="">
      <div className="border border-yellow-500 w-full h-full">
        <h3>{event.event_name}</h3>

        <img src={`${event.event_thumbnail}`}></img>
        <p>{event.event_description}</p>
        <p>{event.event_full_address}</p>
        <p>{dateFormatter(event.event_start_date, 3)}</p>
        <p>{dateFormatter(event.event_end_date, 3)}</p>
        <p>{event.event_cost_in_pence > 0 ? `£${moneyFormatter(event.event_cost_in_pence)}` : "Free"}</p>
      </div>
    </div>
  );
}

export default EventCard;
