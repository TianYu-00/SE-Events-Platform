import React, { useState } from "react";
import { dateFormatter } from "../utils/DateFormatter";
import { moneyFormatter } from "../utils/MoneyFormatter";
import { TbCalendar, TbCalendarTime, TbLocation, TbMapPin, TbUsers } from "react-icons/tb";
import AddToCalendar from "./AddToCalendar";
import { useNavigate } from "react-router-dom";
import { useEventPurchase } from "../hooks/useEventPurchase";

function EventCard({ event }) {
  const navigate = useNavigate();
  const [showCalendarLinks, setShowCalendarLinks] = useState(false);
  const purchaseEvent = useEventPurchase(event);

  const toggleCalendarLinks = () => {
    setShowCalendarLinks((prev) => !prev);
  };

  return (
    <div className="text-copy-primary">
      <div className="w-full h-full bg-card rounded-t-lg border border-border/40 shadow-lg flex flex-col">
        <img
          src={event.event_thumbnail}
          className="rounded-t-lg w-full h-64 object-cover cursor-pointer"
          alt="Event Thumbnail"
          onClick={() => navigate(`/event/${event.event_id}`)}
          onError={(e) => {
            e.target.onerror = null;
            e.target.src = "https://placehold.co/600x400?text=Image+Not+Available";
          }}
        />
        <div className="p-3 flex flex-col flex-grow">
          <div className="mb-3">
            <h3 className="truncate text-2xl font-medium mb-1">{event.event_name}</h3>
            <p className="truncate text-sm text-copy-secondary flex">
              <TbMapPin className="mr-2" size={17} />
              <span>{`${event.event_street_address}, ${event.event_city_town}, ${event.event_postcode}`}</span>
            </p>
            <p className="truncate text-sm text-copy-secondary flex">
              <TbCalendarTime className="mr-2" size={17} /> <span>{dateFormatter(event.event_start_date, 4)}</span>
            </p>
            <p className="truncate text-sm text-copy-secondary flex">
              <TbUsers className="mr-2" size={17} />{" "}
              <span>
                {event.event_attendees} / {event.event_capacity}
              </span>
            </p>
          </div>
          <p className="mb-8 line-clamp-3 mt-3">{event.event_description}</p>
          <div className="flex-grow" />

          <p className="font-bold mb-4">
            {event.event_cost_in_pence > 0 ? `£${moneyFormatter(event.event_cost_in_pence)}` : "Free"}
          </p>
          <div className="flex h-10 gap-4">
            <button
              className={`bg-cta hover:bg-cta-active p-2 rounded-md text-cta-text w-32 flex justify-center items-center ${
                event.event_attendees >= event.event_capacity ? "cursor-not-allowed bg-cta/30 hover:bg-cta/30" : ""
              }`}
              onClick={purchaseEvent}
              disabled={event.event_attendees >= event.event_capacity}
            >
              {event.event_cost_in_pence > 0 ? "Purchase" : "Free"}
            </button>

            <button
              onClick={toggleCalendarLinks}
              className="hover:bg-cta-active hover:text-cta-text p-2 rounded-md text-copy-primary border border-border w-40 ml-auto flex justify-center items-center hover:border-0"
            >
              <TbCalendar className="mr-2" size={17} />
              <span>Add to calendar</span>
            </button>
          </div>

          <AddToCalendar eventData={event} isOpen={showCalendarLinks} onClose={() => setShowCalendarLinks(false)} />
        </div>
      </div>
    </div>
  );
}

export default EventCard;
