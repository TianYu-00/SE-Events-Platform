import React, { useEffect, useState } from "react";
import { TbSearch, TbX } from "react-icons/tb";
import { getAllEvents } from "../api";
import UKCitiesList from "../utils/UKCitiesList";
import { useSearchParams } from "react-router-dom";
import useErrorChecker from "../hooks/useErrorChecker";

function EventsFilter({
  originalEvents,
  filteredEvents,
  setFilteredEvents,
  setOriginalEvents,
  setIsLoadingEvents,
  paginationOption,
  setPaginationOption,
}) {
  const [searchParams, setSearchParams] = useSearchParams();
  const checkError = useErrorChecker();

  const [priceOption, setPriceOption] = useState(searchParams.get("price_option") || "all");
  const [dayOption, setDayOption] = useState(searchParams.get("day_option") || "all");
  const [cityOption, setCityOption] = useState(searchParams.get("city_option") || "all");
  const [startDateOrder, setStartDateOrder] = useState(searchParams.get("start_date_order") || "");
  const [createdAtOrder, setCreatedAtOrder] = useState(searchParams.get("created_at_order") || "");
  const [searchInputQuery, setSearchInputQuery] = useState(searchParams.get("search") || "");
  const [isAllowOutdatedOption, setIsAllowOutdatedOption] = useState(
    searchParams.get("allow_outdated") === "true" || false
  );
  const [isResetFilter, setIsResetFilter] = useState(false);

  const clearFilter = () => {
    setPriceOption("all");
    setDayOption("all");
    setCityOption("all");
    setStartDateOrder("");
    setCreatedAtOrder("");
    setSearchInputQuery("");
    setIsAllowOutdatedOption(false);
    setIsResetFilter(true);
  };

  useEffect(() => {
    if (isResetFilter) {
      updateFilter();
      setIsResetFilter(false);
    }
  }, [isResetFilter]);

  const addFilterToQuery = () => {
    if (priceOption === "all") {
      searchParams.delete("price_option");
    } else {
      searchParams.set("price_option", priceOption);
    }

    if (dayOption === "all") {
      searchParams.delete("day_option");
    } else {
      searchParams.set("day_option", dayOption);
    }

    if (cityOption === "all") {
      searchParams.delete("city_option");
    } else {
      searchParams.set("city_option", cityOption);
    }

    if (isAllowOutdatedOption === false) {
      searchParams.delete("allow_outdated");
    } else {
      searchParams.set("allow_outdated", isAllowOutdatedOption);
    }

    if (searchInputQuery === "") {
      searchParams.delete("search");
    } else {
      searchParams.set("search", searchInputQuery);
    }

    if (startDateOrder === "") {
      searchParams.delete("start_date_order");
    } else {
      searchParams.set("start_date_order", startDateOrder);
    }

    if (createdAtOrder === "") {
      searchParams.delete("created_at_order");
    } else {
      searchParams.set("created_at_order", createdAtOrder);
    }

    setSearchParams(searchParams);
  };

  useEffect(() => {
    if (searchParams.size > 0) {
      updateFilter();
    }
  }, []);

  const updateFilter = () => {
    addFilterToQuery();

    if (!startDateOrder && !createdAtOrder) {
      fetchAllEvents();
    } else {
      fetchOrderedEvents();
    }
  };

  const fetchAllEvents = async () => {
    try {
      setIsLoadingEvents(true);
      const response = await getAllEvents({
        isAllowOutdated: isAllowOutdatedOption,
      });
      setOriginalEvents(response.data);
      setFilteredEvents(applyFilters(response.data));
    } catch (error) {
      checkError(error);
    } finally {
      setIsLoadingEvents(false);
    }
  };

  const fetchOrderedEvents = async () => {
    try {
      const query = {
        isAllowOutdated: isAllowOutdatedOption,
      };
      if (startDateOrder) query.orderStartDate = startDateOrder;
      if (createdAtOrder) query.orderCreatedAt = createdAtOrder;

      setIsLoadingEvents(true);
      const response = await getAllEvents(query);
      setOriginalEvents(response.data);
      setFilteredEvents(applyFilters(response.data));
    } catch (error) {
      checkError(error);
    } finally {
      setIsLoadingEvents(false);
    }
  };

  const handle_StartDateOrderChange = (value) => {
    setStartDateOrder(value);
    if (value) setCreatedAtOrder("");
  };

  const handle_CreatedAtOrderChange = (value) => {
    setCreatedAtOrder(value);
    if (value) setStartDateOrder("");
  };

  const applyFilters = (events = originalEvents) => {
    let tempEvents = [...events];

    if (priceOption === "free") {
      tempEvents = tempEvents.filter((event) => event.event_cost_in_pence === 0);
    } else if (priceOption === "paid") {
      tempEvents = tempEvents.filter((event) => event.event_cost_in_pence > 0);
    }

    if (dayOption !== "all") {
      tempEvents = tempEvents.filter((event) => {
        const eventDay = new Date(event.event_start_date).toLocaleString("en-US", { weekday: "long" }).toLowerCase();
        return eventDay === dayOption;
      });
    }

    if (searchInputQuery) {
      tempEvents = tempEvents.filter((event) => {
        const nameMatches = event.event_name.toLowerCase().includes(searchInputQuery.toLowerCase());
        const tagsMatch = event.event_tags.some((tag) => tag.toLowerCase().includes(searchInputQuery.toLowerCase()));

        return nameMatches || tagsMatch;
      });
    }

    if (cityOption && cityOption !== "all") {
      tempEvents = tempEvents.filter((event) => event.event_city_town.toLowerCase() === cityOption.toLowerCase());
    }

    return tempEvents;
  };

  return (
    <div className="w-full rounded-md text-copy-primary">
      <div className="flex flex-col py-6 p-4 space-y-4 overflow-x-auto bg-card rounded-md">
        <div className="flex flex-row space-x-4">
          {FilterButton({ option: dayOption, setOption: setDayOption, value: "all", text: "All" })}
          {FilterButton({ option: dayOption, setOption: setDayOption, value: "monday", text: "Monday" })}
          {FilterButton({ option: dayOption, setOption: setDayOption, value: "tuesday", text: "Tuesday" })}
          {FilterButton({ option: dayOption, setOption: setDayOption, value: "wednesday", text: "Wednesday" })}
          {FilterButton({ option: dayOption, setOption: setDayOption, value: "thursday", text: "Thursday" })}
          {FilterButton({ option: dayOption, setOption: setDayOption, value: "friday", text: "Friday" })}
          {FilterButton({ option: dayOption, setOption: setDayOption, value: "saturday", text: "Saturday" })}
          {FilterButton({ option: dayOption, setOption: setDayOption, value: "sunday", text: "Sunday" })}
        </div>

        <div className="flex flex-row space-x-4">
          <button
            className={`${
              !startDateOrder && !createdAtOrder ? "bg-cta text-cta-text" : ""
            } p-1 px-3 rounded-full whitespace-nowrap`}
            onClick={() => {
              setStartDateOrder("");
              setCreatedAtOrder("");
            }}
          >
            None
          </button>
          {FilterButton({
            option: startDateOrder,
            setOption: handle_StartDateOrderChange,
            value: "asc",
            text: "Start Date: Ascending",
          })}
          {FilterButton({
            option: startDateOrder,
            setOption: handle_StartDateOrderChange,
            value: "desc",
            text: "Start Date: Descending",
          })}
          {FilterButton({
            option: createdAtOrder,
            setOption: handle_CreatedAtOrderChange,
            value: "asc",
            text: "Created At: Ascending",
          })}
          {FilterButton({
            option: createdAtOrder,
            setOption: handle_CreatedAtOrderChange,
            value: "desc",
            text: "Created At: Descending",
          })}
        </div>

        <div className="flex flex-row space-x-4">
          {FilterButton({
            option: isAllowOutdatedOption,
            setOption: setIsAllowOutdatedOption,
            value: false,
            text: "Hide past events",
          })}
          {FilterButton({
            option: isAllowOutdatedOption,
            setOption: setIsAllowOutdatedOption,
            value: true,
            text: "Show past events",
          })}
        </div>

        <div className="flex flex-row space-x-4">
          {FilterButton({ option: paginationOption, setOption: setPaginationOption, value: "load", text: "Load More" })}
          {FilterButton({
            option: paginationOption,
            setOption: setPaginationOption,
            value: "page",
            text: "Pagination",
          })}
        </div>

        <div className="flex flex-row space-x-4">
          {FilterButton({ option: priceOption, setOption: setPriceOption, value: "all", text: "All" })}
          {FilterButton({ option: priceOption, setOption: setPriceOption, value: "paid", text: "Paid" })}
          {FilterButton({ option: priceOption, setOption: setPriceOption, value: "free", text: "Free" })}
        </div>
      </div>

      <div className="py-4 flex flex-col md:flex-row gap-4">
        <div className="relative flex-grow flex items-center">
          <input
            type="text"
            value={searchInputQuery}
            onChange={(e) => setSearchInputQuery(e.target.value)}
            placeholder="Search by name or tag..."
            className="w-full pl-10 pr-10 py-2 border border-gray-300 rounded-md shadow-sm bg-card"
            aria-label="Search events by name or tag"
          />
          <TbSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
          <TbX
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-red-500 cursor-pointer"
            size={20}
            onClick={() => clearFilter()}
          />
        </div>

        <select
          name="locations"
          id="locations"
          value={cityOption}
          onChange={(e) => setCityOption(e.target.value)}
          className="p-2 rounded-md flex justify-center items-center border border-border bg-card"
          aria-label="select city to filter"
        >
          <option value="all" disabled>
            -- Filter By City --
          </option>
          <option value="all">-- None --</option>
          {UKCitiesList.map((city) => (
            <option key={city} value={city}>
              {city}
            </option>
          ))}
        </select>

        <div className="flex items-center">
          <button
            className="p-2 bg-cta text-cta-text hover:bg-cta-active rounded-md w-full"
            onClick={() => updateFilter()}
          >
            Apply Filters
          </button>
        </div>
      </div>

      <div className="flex justify-end text-copy-primary/70">
        <span>
          {filteredEvents.length} Result{filteredEvents.length > 1 && "s"} in total
        </span>
      </div>
    </div>
  );
}

export default EventsFilter;

function FilterButton({ option, setOption, value, text }) {
  return (
    <button
      className={`${option === value ? "bg-cta px-3 text-cta-text" : ""} p-1 px-2 rounded-full whitespace-nowrap`}
      onClick={() => setOption(value)}
    >
      {text}
    </button>
  );
}
