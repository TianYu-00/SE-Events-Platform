import React, { useEffect, useState } from "react";
import { TbSearch } from "react-icons/tb";

function EventsFilter({ originalEvents, filteredEvents, setFilteredEvents }) {
  const [priceOption, setPriceOption] = useState("all");
  const [dayOption, setDayOption] = useState("all");
  const [dateRangeOption, setDateRangeOption] = useState("all");

  useEffect(() => {
    const appliedFilterEvents = applyFilters();
    setFilteredEvents(appliedFilterEvents);
  }, [priceOption, dayOption, dateRangeOption]);

  const applyFilters = () => {
    let tempEvents = [...originalEvents];

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

    console.log(tempEvents);
    return tempEvents;
  };

  return (
    <div className="w-full rounded-md text-copy-primary">
      <div className="flex flex-col p-4 space-y-4 border border-blue-500">
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

        {/* <div className="flex flex-row space-x-4">
          {FilterButton({ option: dateRangeOption, setOption: setDateRangeOption, value: "all", text: "All" })}
          {FilterButton({ option: dateRangeOption, setOption: setDateRangeOption, value: "today", text: "Today" })}
          {FilterButton({ option: dateRangeOption, setOption: setDateRangeOption, value: "week", text: "This Week" })}
          {FilterButton({ option: dateRangeOption, setOption: setDateRangeOption, value: "month", text: "This Month" })}
          {FilterButton({ option: dateRangeOption, setOption: setDateRangeOption, value: "year", text: "This Year" })}
        </div> */}

        <div className="flex flex-row space-x-4">
          {FilterButton({ option: priceOption, setOption: setPriceOption, value: "all", text: "All" })}
          {FilterButton({ option: priceOption, setOption: setPriceOption, value: "paid", text: "Paid" })}
          {FilterButton({ option: priceOption, setOption: setPriceOption, value: "free", text: "Free" })}
        </div>
      </div>

      <div className="py-4">
        <div className="relative">
          <input
            type="text"
            value={""}
            onChange={() => {}}
            placeholder="Search..."
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md shadow-sm"
          />
          <TbSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
        </div>
      </div>
    </div>
  );
}

export default EventsFilter;

function FilterButton({ option, setOption, value, text }) {
  return (
    <button className={`${option === value ? "bg-cta" : ""} p-1 px-2 rounded-md`} onClick={() => setOption(value)}>
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
