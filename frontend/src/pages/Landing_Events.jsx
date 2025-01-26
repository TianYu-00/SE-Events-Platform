import React, { useEffect, useState, lazy, Suspense } from "react";
import { getAllEvents } from "../api";
import EventsFilter from "../components/EventsFilter";
import EventCardSkeleton from "../components/EventCardSkeleton";
const EventCard = lazy(() => import("../components/EventCard"));

function Landing_Events() {
  const [originalEvents, setOriginalEvents] = useState([]);
  const [filteredEvents, setFilteredEvents] = useState([]);
  const [isLoadingEvents, setIsLoadingEvents] = useState(true);

  useEffect(() => {
    const runFetchEvents = async () => {
      setIsLoadingEvents(true);
      try {
        const response = await getAllEvents({});
        console.log(response.data);
        setOriginalEvents(response.data);
        setFilteredEvents(response.data);
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoadingEvents(false);
      }
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
            setOriginalEvents={setOriginalEvents}
            setIsLoadingEvents={setIsLoadingEvents}
          />
        </div>

        {!isLoadingEvents ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5 p-4 ">
            <Suspense fallback={<EventCardSkeleton events={originalEvents} />}>
              {filteredEvents.map((event) => (
                <EventCard event={event} key={event.event_id} />
              ))}
            </Suspense>
          </div>
        ) : (
          <div className="flex justify-center items-center space-x-4">
            <div className="animate-spin inline-block size-5 border-[3px] border-current border-t-transparent text-cta rounded-full" />
            <span>Loading Events...</span>
          </div>
        )}
      </div>
    </div>
  );
}

export default Landing_Events;
