import React, { useEffect, useState } from "react";
import { TbSearch } from "react-icons/tb";
import { getAllEvents } from "../api";

function EventsFilter({ originalEvents, filteredEvents, setFilteredEvents, setOriginalEvents, setIsLoadingEvents }) {
  const [priceOption, setPriceOption] = useState("all");
  const [dayOption, setDayOption] = useState("all");
  const [startDateOrder, setStartDateOrder] = useState("");
  const [createdAtOrder, setCreatedAtOrder] = useState("");
  const [searchInputQuery, setSearchInputQuery] = useState("");

  const updateFilter = () => {
    if (!startDateOrder && !createdAtOrder) {
      fetchAllEvents();
    } else {
      fetchOrderedEvents();
    }
  };

  const fetchAllEvents = async () => {
    try {
      setIsLoadingEvents(true);
      const response = await getAllEvents({});
      setOriginalEvents(response.data);
      setFilteredEvents(applyFilters(response.data));
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoadingEvents(false);
    }
  };

  const fetchOrderedEvents = async () => {
    try {
      const query = {};
      if (startDateOrder) query.orderStartDate = startDateOrder;
      if (createdAtOrder) query.orderCreatedAt = createdAtOrder;

      setIsLoadingEvents(true);
      const response = await getAllEvents(query);
      setOriginalEvents(response.data);
      setFilteredEvents(applyFilters(response.data));
    } catch (error) {
      console.error("Failed to fetch ordered events:", error);
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
      tempEvents = tempEvents.filter((event) =>
        event.event_name.toLowerCase().includes(searchInputQuery.toLowerCase())
      );
    }

    return tempEvents;
  };

  return (
    <div className="w-full rounded-md text-copy-primary">
      <div className="flex flex-col p-4 space-y-4 border border-blue-500 overflow-x-auto">
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
            className={`${!startDateOrder && !createdAtOrder ? "bg-cta text-cta-text" : ""} p-1 px-2 rounded-md`}
            onClick={() => {
              setStartDateOrder("");
              setCreatedAtOrder("");
            }}
          >
            Clear Sorting
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
          {FilterButton({ option: priceOption, setOption: setPriceOption, value: "all", text: "All" })}
          {FilterButton({ option: priceOption, setOption: setPriceOption, value: "paid", text: "Paid" })}
          {FilterButton({ option: priceOption, setOption: setPriceOption, value: "free", text: "Free" })}
        </div>
      </div>

      <div className="py-4 flex flex-row space-x-4">
        <div className="relative flex-grow flex items-center">
          <input
            type="text"
            value={searchInputQuery}
            onChange={(e) => setSearchInputQuery(e.target.value)}
            placeholder="Search by name..."
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md shadow-sm bg-card"
          />
          <TbSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
        </div>

        <div className="flex items-center">
          <button className="p-2 bg-cta text-cta-text hover:bg-cta-active rounded-md" onClick={() => updateFilter()}>
            Apply Filters
          </button>
        </div>
      </div>
    </div>
  );
}

export default EventsFilter;

function FilterButton({ option, setOption, value, text }) {
  return (
    <button
      className={`${option === value ? "bg-cta text-cta-text" : ""} p-1 px-2 rounded-md`}
      onClick={() => setOption(value)}
    >
      {text}
    </button>
  );
}

/*

- ALL, PAID, FREE
- ALL, MONDAY, TUESDAY, WEDNESDAY, THURSDAY, FRIDAY, SATURDAY, SUNDAY
- ALL, TODAY, THIS WEEK, THIS MONTH, THIS YEAR

- SEARCH BY NAME / TAG
- LOCATION? 

*/
