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
          <ImageScroller events={events} />
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-black opacity-70"></div>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <h2 className="text-white font-bold text-2xl md:text-5xl mb-4 w-2/3 text-center drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8)]">
              Discover and book tickets for incredible events happening across the UK with{" "}
              <span className="bg-gradient-to-r from-red-700 via-white to-blue-700 bg-clip-text text-transparent text-nowrap">
                United Events
              </span>
            </h2>
            <button
              className="text-cta-text bg-cta hover:bg-cta-active py-3 px-4 rounded-full font-semibold flex items-center space-x-2"
              onClick={() => navigate("/events")}
            >
              <span>Explore Events</span>
              <TbArrowNarrowRight size={20} strokeWidth={3} className="" />
            </button>
          </div>
        </div>

        {/* Latest created */}
        <div className="max-w-screen-2xl mx-auto mt-10 ">
          <div className="flex items-center space-x-4 px-4">
            <h3 className="font-semibold text-lg md:text-3xl">Latest Events Created</h3>
            <TbCornerRightDown size={22} strokeWidth={3} />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5 p-4 ">
            <Suspense fallback={<EventCardSkeleton events={events} minDisplay={3} maxDisplay={3} />}>
              {events.length > 0 ? (
                events.slice(0, showingNewlyCreated).map((event) => <EventCard event={event} key={event.event_id} />)
              ) : (
                <div>No newly created events available</div>
              )}
            </Suspense>
          </div>
        </div>

        {/* Rest of some of the events */}
        <div className="max-w-screen-2xl mx-auto mt-10">
          <div className="flex items-center space-x-4 px-4">
            <h3 className="font-semibold text-lg md:text-3xl">Events</h3>
            <TbCornerRightDown size={22} strokeWidth={3} />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5 p-4 ">
            <Suspense fallback={<EventCardSkeleton events={events} minDisplay={6} maxDisplay={6} />}>
              {events.length > showingEventsStartingFrom ? (
                events
                  .slice(showingEventsStartingFrom, showingEventsEnding)
                  .map((event) => <EventCard event={event} key={event.event_id} />)
              ) : (
                <div>No more events available</div>
              )}
            </Suspense>
          </div>

          <div className="flex flex-row items-center justify-center p-10">
            <button
              className="text-cta-text bg-cta hover:bg-cta-active py-3 px-4 rounded-full font-semibold flex items-center space-x-2"
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
