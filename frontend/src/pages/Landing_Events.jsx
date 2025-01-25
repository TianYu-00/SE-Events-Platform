import React, { useEffect, useState } from "react";
import { getAllEvents } from "../api";
import EventCard from "../components/EventCard";
import EventsFilter from "../components/EventsFilter";

function Landing_Events() {
  const [originalEvents, setOriginalEvents] = useState([]);
  const [filteredEvents, setFilteredEvents] = useState([]);

  useEffect(() => {
    const runFetchEvents = async () => {
      const response = await getAllEvents({ orderCreatedAt: "desc" });
      setOriginalEvents(response.data);
      setFilteredEvents(response.data);
    };

    runFetchEvents();
  }, []);

  useEffect(() => {
    // console.log(events);
  }, [originalEvents]);

  return (
    <div className="text-copy-primary">
      <div className="max-w-screen-xl mx-auto mt-10">
        <div className="p-4">
          <EventsFilter
            setFilteredEvents={setFilteredEvents}
            filteredEvents={filteredEvents}
            originalEvents={originalEvents}
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5 p-4 ">
          {filteredEvents.map((event) => (
            <EventCard event={event} key={event.event_id} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default Landing_Events;
