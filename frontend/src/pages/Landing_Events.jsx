import React, { useEffect, useState } from "react";
import { getAllEvents } from "../api";
import EventCard from "../components/EventCard";

function Landing_Events() {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    const runFetchEvents = async () => {
      const response = await getAllEvents({ orderCreatedAt: "desc" });
      setEvents(response.data);
    };

    runFetchEvents();
  }, []);

  useEffect(() => {
    // console.log(events);
  }, [events]);

  return (
    <div className="text-copy-primary">
      <div className="max-w-screen-xl mx-auto mt-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5 p-4 ">
          {events.map((event) => (
            <EventCard event={event} key={event.event_id} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default Landing_Events;
