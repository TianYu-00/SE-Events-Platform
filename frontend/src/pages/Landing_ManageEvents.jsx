import React, { useState, useEffect } from "react";
import { getAllEvents } from "../api";
import { dateFormatter } from "../components/DateFormatter";
import { moneyFormatter } from "../components/MoneyFormatter";
import { TbDotsVertical } from "react-icons/tb";

function Landing_ManageEvents() {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    const runFetchEvents = async () => {
      const response = await getAllEvents({});
      setEvents(response.data);
    };

    runFetchEvents();
  }, []);

  useEffect(() => {
    console.log(events);
  }, [events]);

  return (
    <div className="">
      <table className="w-full table-auto border-collapse">
        <thead>
          <tr className="text-copy-primary">
            <th className="px-4 py-2">
              <input type="checkbox" />
            </th>
            <th className="px-4 py-2 text-left">ID</th>
            <th className="px-4 py-2 text-left">Name</th>
            <th className="px-4 py-2 text-left hidden md:table-cell">Start Date</th>
            <th className="px-4 py-2 text-left hidden md:table-cell">End Date</th>
            <th className="px-4 py-2 text-left hidden md:table-cell">Created At</th>
            <th className="px-4 py-2 text-left hidden md:table-cell">Modified At</th>
            <th className="px-4 py-2 text-left hidden md:table-cell">Cost</th>
            <th className="px-4 py-2 text-left hidden md:table-cell">Capacity</th>
            <th className="px-4 py-2"></th>
          </tr>
        </thead>
        <tbody>
          {events.map((event) => {
            return (
              <tr key={event.event_id} className="border-t text-copy-primary/65 hover:bg-background-opp/10">
                <td className="px-4 py-4 text-center">
                  <input type="checkbox" />
                </td>
                <td className="px-4 py-4">{event.event_id}</td>
                <td className="px-4 py-4">{event.event_name}</td>
                <td className="px-4 py-4 hidden md:table-cell ">{dateFormatter(event.event_start_date, 3)}</td>
                <td className="px-4 py-4 hidden md:table-cell">{dateFormatter(event.event_end_date, 3)}</td>
                <td className="px-4 py-4 hidden md:table-cell ">{dateFormatter(event.event_created_at, 3)}</td>
                <td className="px-4 py-4 hidden md:table-cell">{dateFormatter(event.event_modified_at, 3)}</td>
                <td className="px-4 py-4 hidden md:table-cell">£{moneyFormatter(event.event_cost_in_pence)}</td>
                <td className="px-4 py-4 hidden md:table-cell">
                  {event.event_attendees}/{event.event_capacity}
                </td>
                <td className="px-4 py-4">
                  <button className="hover:bg-background-opp/10 rounded flex p-2">
                    <TbDotsVertical size={20} />
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

export default Landing_ManageEvents;
