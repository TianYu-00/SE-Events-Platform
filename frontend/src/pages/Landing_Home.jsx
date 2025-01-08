import React, { useEffect, useState } from "react";
import { testApi, getAllEvents } from "../api";
import EventCard from "../components/EventCard";
import ImageScroller from "../components/ImageScroller";

function Landing_Home() {
  const [events, setEvents] = useState([]);
  useEffect(() => {
    const runFetchEvents = async () => {
      const response = await getAllEvents();
      setEvents(response.data);
    };

    runFetchEvents();
  }, []);

  useEffect(() => {
    // console.log(events);
  }, [events]);

  return (
    <div className="text-copy-primary">
      <div className="">
        {/* <h2>Lorem ipsum dolor sit amet.</h2>
        <p>Explore More</p> */}
        <ImageScroller events={events} />
      </div>

      <div className="max-w-screen-xl mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5 p-4 ">
          {events.map((event) => (
            <EventCard event={event} key={event.event_id} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default Landing_Home;
