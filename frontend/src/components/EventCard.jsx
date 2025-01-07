import React from "react";
import { dateFormatter } from "./DateFormatter";
import { moneyFormatter } from "./MoneyFormatter";
// https://react-icons.github.io/react-icons/icons/tb/
import { TbCalendar, TbCalendarTime, TbLocation, TbBuilding } from "react-icons/tb";

function EventCard({ event }) {
  return (
    <div>
      <div className="w-full h-full bg-card rounded-t-lg border border-border/40 shadow-lg">
        <img src={`${event.event_thumbnail}`} className="rounded-t-lg w-full"></img>
        <div className="p-3">
          <div className="mb-3">
            <h3 className="truncate text-2xl font-medium">{event.event_name}</h3>
            <p className="truncate text-sm text-copy-secondary flex">
              <TbLocation className="mr-2" size={17} /> <span>{event.event_full_address}</span>
            </p>
            <p className="truncate text-sm text-copy-secondary flex">
              <TbCalendarTime className="mr-2" size={17} /> <span>{dateFormatter(event.event_start_date, 4)}</span>
            </p>
            <p className="truncate text-sm text-copy-secondary flex">
              <TbBuilding className="mr-2" size={17} /> <span>{event.event_organizer_company}</span>
            </p>
          </div>

          <p className="mb-10">{event.event_description}</p>
          <p className="font-bold mb-4">
            {event.event_cost_in_pence > 0 ? `£${moneyFormatter(event.event_cost_in_pence)}` : "Free"}
          </p>
          <div className="flex h-10">
            <button className="bg-cta hover:bg-cta-active p-2 rounded-md text-cta-text w-32 flex justify-center items-center">
              {event.event_cost_in_pence > 0 ? "Purchase" : "Free"}
            </button>
            <button className="hover:bg-cta-active hover:text-cta-text p-2 rounded-md text-copy-primary border border-border w-40 ml-auto flex justify-center items-center hover:border-0">
              <TbCalendar className="mr-2" size={17} />
              <span>Add to calendar</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default EventCard;
