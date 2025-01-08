import React, { useEffect, useState } from "react";
import { testApi, getAllEvents } from "../api";
import { TbArrowNarrowRight } from "react-icons/tb";
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
      <div className="relative">
        <ImageScroller events={events} />
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-black opacity-40"></div>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <h2 className="text-white font-bold text-2xl md:text-5xl mb-4">Lorem ipsum dolor sit amet.</h2>
          <button className="text-cta-text bg-cta hover:bg-cta-active py-3 px-4 rounded-md font-semibold flex items-center space-x-2">
            <span>Explore Events</span>
            <TbArrowNarrowRight size={20} strokeWidth={3} />
          </button>
        </div>
      </div>

      <div className="max-w-screen-xl mx-auto mt-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5 p-4 ">
          {events.map((event) => (
            <EventCard event={event} key={event.event_id} />
          ))}
        </div>

        <div className="flex flex-row items-center justify-center p-10">
          <button className="text-cta-text bg-cta hover:bg-cta-active py-3 px-4 rounded-md font-semibold flex items-center space-x-2">
            <span>Browse More</span>
            <TbArrowNarrowRight size={20} strokeWidth={3} />
          </button>
        </div>
      </div>
    </div>
  );
}

export default Landing_Home;
