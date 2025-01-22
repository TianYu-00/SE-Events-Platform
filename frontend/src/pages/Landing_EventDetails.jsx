import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getEvent } from "../api";
import { moneyFormatter } from "../components/MoneyFormatter";
import { dateFormatter } from "../components/DateFormatter";

function Landing_EventDetails() {
  const [event, setEvent] = useState(null);
  const { eventId } = useParams();

  useEffect(() => {
    const runFetchEvent = async () => {
      const response = await getEvent(eventId);
      const eventData = response.data;
      setEvent(eventData);
      console.log(eventData);
    };

    runFetchEvent();
  }, []);

  return (
    <div className="text-copy-primary">
      <img src={event.event_thumbnail} alt="" />
      <h2>{event.event_name}</h2>
      <p>{event.event_description}</p>
      <p>{event.event_attendees}</p>
      <p>{event.event_capacity}</p>
      <p>
        {event.event_contact_phone_prefix} {event.event_contact_phone}
      </p>
      <p>{event.event_contact_email}</p>
      <p>£{moneyFormatter(event.event_cost_in_pence)}</p>
      <p>{dateFormatter(event.event_created_at, 3)}</p>
      <p>{dateFormatter(event.event_modified_at, 3)}</p>
      <p>{dateFormatter(event.event_start_date, 3)}</p>
      <p>{dateFormatter(event.event_end_date, 3)}</p>
      <p>{event.event_full_address}</p>
      <p>{event.event_tags}</p>
      <p>{event.event_website}</p>
    </div>
  );
}

export default Landing_EventDetails;

/*

- Get event id from link
- Fetch event by id
- Display event info
- Add to calendar
- Pay for the event

Optional:
- Share event

*/
