import React, { useEffect, useState, lazy, Suspense } from "react";
import { testApi, getAllEvents } from "../api";
import { TbArrowNarrowRight, TbCornerRightDown } from "react-icons/tb";
import ImageScroller from "../components/ImageScroller";
import { useNavigate } from "react-router-dom";
import EventCardSkeleton from "../components/EventCardSkeleton";
import { toast } from "react-toastify";
import useErrorChecker from "../hooks/useErrorChecker";
import PageLoader from "../components/PageLoader";
const EventCard = lazy(() => import("../components/EventCard"));

function Landing_Home() {
  const checkError = useErrorChecker();

  const [events, setEvents] = useState([]);
  const showingNewlyCreated = 3;
  const showingEventsStartingFrom = 3;
  const showingEventsEnding = 9;
  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const runFetchEvents = async () => {
      try {
        setIsLoading(true);
        const response = await getAllEvents({ orderCreatedAt: "desc" });
        setEvents(response.data);
      } catch (error) {
        checkError(error);
      } finally {
        setIsLoading(false);
      }
    };

    runFetchEvents();
  }, []);

  useEffect(() => {
    // console.log(events);
  }, [events]);

  return (
    <PageLoader isLoading={isLoading} message="fetching events" delay={0}>
      <div className="text-copy-primary">
        {/* Event scroller */}
        <div className="relative">
          <div className="h-full">
            <ImageScroller events={events} />
          </div>

          <div className="absolute inset-0 flex flex-col items-center justify-center bg-black opacity-40"></div>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <h2 className="text-white font-bold text-2xl md:text-5xl mb-4">Lorem ipsum dolor sit amet.</h2>
            <button
              className="text-cta-text bg-cta hover:bg-cta-active py-3 px-4 rounded-md font-semibold flex items-center space-x-2"
              onClick={() => navigate("/events")}
            >
              <span>Explore Events</span>
              <TbArrowNarrowRight size={20} strokeWidth={3} />
            </button>
          </div>
        </div>

        {/* Latest created */}
        <div className="max-w-screen-xl mx-auto mt-10 ">
          <div className="flex items-center space-x-2 px-4">
            <h3 className="font-semibold text-lg md:text-3xl">Latest Events Created</h3>
            <TbCornerRightDown size={22} strokeWidth={3} />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5 p-4 ">
            <Suspense fallback={<EventCardSkeleton events={events} minDisplay={3} maxDisplay={3} />}>
              {events.slice(0, showingNewlyCreated).map((event) => (
                <EventCard event={event} key={event.event_id} />
              ))}
            </Suspense>
          </div>
        </div>

        {/* Rest of some of the events */}
        <div className="max-w-screen-xl mx-auto mt-10">
          <div className="flex items-center space-x-2 px-4">
            <h3 className="font-semibold text-lg md:text-3xl">Events</h3>
            <TbCornerRightDown size={22} strokeWidth={3} />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5 p-4 ">
            <Suspense fallback={<EventCardSkeleton events={events} minDisplay={6} maxDisplay={6} />}>
              {events.slice(showingEventsStartingFrom, showingEventsEnding).map((event) => (
                <EventCard event={event} key={event.event_id} />
              ))}
            </Suspense>
          </div>

          <div className="flex justify-center items-center">
            <p className="text-copy-secondary text-sm">
              {showingEventsStartingFrom} - {showingEventsEnding} of {events.length} events
            </p>
          </div>

          <div className="flex flex-row items-center justify-center p-10">
            <button
              className="text-cta-text bg-cta hover:bg-cta-active py-3 px-4 rounded-md font-semibold flex items-center space-x-2"
              onClick={() => navigate("/events")}
            >
              <span>Browse More</span>
              <TbArrowNarrowRight size={20} strokeWidth={3} />
            </button>
          </div>
        </div>
      </div>
    </PageLoader>
  );
}

export default Landing_Home;
