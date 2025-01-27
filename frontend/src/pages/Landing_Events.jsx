import React, { useEffect, useState, lazy, Suspense } from "react";
import { getAllEvents } from "../api";
import EventsFilter from "../components/EventsFilter";
import EventCardSkeleton from "../components/EventCardSkeleton";
import { TbChevronLeft, TbChevronRight } from "react-icons/tb";
import useErrorChecker from "../hooks/useErrorChecker";
import PageLoader from "../components/PageLoader";
const EventCard = lazy(() => import("../components/EventCard"));

function Landing_Events() {
  const checkError = useErrorChecker();

  const [originalEvents, setOriginalEvents] = useState([]);
  const [filteredEvents, setFilteredEvents] = useState([]);
  const [displayedEvents, setDisplayedEvents] = useState([]);
  const [isLoadingEvents, setIsLoadingEvents] = useState(true);
  const [paginationOption, setPaginationOption] = useState("load");
  const [resultsPerPage, setResultsPerPage] = useState(9);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    const runFetchEvents = async () => {
      setIsLoadingEvents(true);
      try {
        const response = await getAllEvents({ isAllowOutdated: false });
        setOriginalEvents(response.data);
        setFilteredEvents(response.data);
      } catch (error) {
        // console.error(error);
        checkError(error);
      } finally {
        setIsLoadingEvents(false);
      }
    };

    runFetchEvents();
  }, []);

  useEffect(() => {
    if (paginationOption === "load") {
      setDisplayedEvents(filteredEvents.slice(0, resultsPerPage));
    } else if (paginationOption === "page") {
      const startIndex = (currentPage - 1) * resultsPerPage;
      const endIndex = startIndex + resultsPerPage;
      setDisplayedEvents(filteredEvents.slice(startIndex, endIndex));
    }
  }, [filteredEvents, resultsPerPage, currentPage, paginationOption]);

  useEffect(() => {
    if (paginationOption === "load") {
      setResultsPerPage(9);
    } else if (paginationOption === "page") {
      setCurrentPage(1);
    }
  }, [paginationOption]);

  useEffect(() => {
    setCurrentPage(1);
    setResultsPerPage(9);
  }, [filteredEvents]);

  const handle_LoadMore = () => {
    setResultsPerPage((prev) => prev + 9);
  };

  const handle_PreviousPage = () => {
    setCurrentPage((prev) => {
      const newPage = Math.max(prev - 1, 1);
      window.scrollTo(0, 0);
      return newPage;
    });
  };

  const handle_NextPage = () => {
    setCurrentPage((prev) => {
      const newPage = Math.min(prev + 1, Math.ceil(filteredEvents.length / resultsPerPage));
      window.scrollTo(0, 0);
      return newPage;
    });
  };

  const handle_PageInput = (e) => {
    const pageNumber = parseInt(e.target.value, 10);
    if (pageNumber > 0 && pageNumber <= Math.ceil(filteredEvents.length / resultsPerPage)) {
      setCurrentPage(pageNumber);
    }
  };

  return (
    <PageLoader isLoading={isLoadingEvents} message="fetching events">
      <div className="text-copy-primary">
        <div className="max-w-screen-xl mx-auto mt-10">
          <div className="p-4">
            <EventsFilter
              setFilteredEvents={setFilteredEvents}
              filteredEvents={filteredEvents}
              originalEvents={originalEvents}
              setOriginalEvents={setOriginalEvents}
              setIsLoadingEvents={setIsLoadingEvents}
              paginationOption={paginationOption}
              setPaginationOption={setPaginationOption}
            />
          </div>

          {!isLoadingEvents ? (
            <>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5 p-4">
                <Suspense fallback={<EventCardSkeleton events={originalEvents} maxDisplay={resultsPerPage} />}>
                  {displayedEvents.map((event) => (
                    <EventCard event={event} key={event.event_id} />
                  ))}
                </Suspense>
              </div>

              <div className="my-10 flex justify-center items-center">
                {paginationOption === "load" && (
                  <div className="flex justify-center">
                    {resultsPerPage < filteredEvents.length && (
                      <button
                        onClick={handle_LoadMore}
                        className="p-2 px-4 bg-cta text-cta-text hover:bg-cta-active rounded-md"
                      >
                        Load More
                      </button>
                    )}
                  </div>
                )}

                {paginationOption === "page" && (
                  <div className="flex justify-center items-center space-x-2">
                    <button
                      onClick={handle_PreviousPage}
                      disabled={currentPage === 1}
                      className={`p-2 px-4 text-cta-text hover:bg-cta-active rounded-md ${
                        currentPage === 1 ? "hover:bg-cta/0" : ""
                      }`}
                    >
                      <TbChevronLeft size={17} strokeWidth={3} />
                    </button>
                    <input
                      type="number"
                      value={currentPage}
                      onChange={handle_PageInput}
                      min="1"
                      max={Math.ceil(filteredEvents.length / resultsPerPage)}
                      className="w-16 text-center border rounded text-copy-primary bg-card"
                    />
                    <button
                      onClick={handle_NextPage}
                      disabled={currentPage === Math.ceil(filteredEvents.length / resultsPerPage)}
                      className={`p-2 px-4 hover:bg-cta-active rounded-md ${
                        currentPage === Math.ceil(filteredEvents.length / resultsPerPage) ? "hover:bg-cta/0" : ""
                      }`}
                    >
                      <TbChevronRight size={17} strokeWidth={3} />
                    </button>
                  </div>
                )}
              </div>
            </>
          ) : (
            <div className="flex justify-center items-center space-x-4">
              <div className="animate-spin inline-block size-5 border-[3px] border-current border-t-transparent text-cta rounded-full" />
              <span>Loading Events...</span>
            </div>
          )}
        </div>
      </div>
    </PageLoader>
  );
}

export default Landing_Events;
