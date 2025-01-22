import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getEvent } from "../api";
import { moneyFormatter } from "../components/MoneyFormatter";
import { dateFormatter } from "../components/DateFormatter";
import {
  TbCalendar,
  TbCalendarClock,
  TbCash,
  TbMail,
  TbMapPin,
  TbPhone,
  TbTags,
  TbUsers,
  TbWorld,
} from "react-icons/tb";
import AddToCalendar from "../components/AddToCalendar";

function Landing_EventDetails() {
  const [event, setEvent] = useState(null);
  const { eventId } = useParams();
  const navigate = useNavigate();
  const [showCalendarLinks, setShowCalendarLinks] = useState(false);

  const toggleCalendarLinks = () => {
    setShowCalendarLinks((prev) => !prev);
  };

  useEffect(() => {
    const runFetchEvent = async () => {
      const response = await getEvent(eventId);
      const eventData = response.data;
      setEvent(eventData);
      // console.log(eventData);
    };

    runFetchEvent();
  }, []);

  const handle_EventPurchase = async () => {
    if (event.event_cost_in_pence > 0) {
      navigate(`/payment?event_id=${eventId}`);
    } else {
      console.log("ITS FREE!");
    }
  };

  if (!event) {
    return <div>Loading...</div>;
  }

  return (
    <div className="text-copy-primary min-h-[calc(100vh-5rem)] max-w-screen-xl mx-auto p-4">
      <div className="shadow-md rounded-lg">
        <img
          src={event.event_thumbnail}
          alt={`${event.event_name} image`}
          className="rounded-lg w-full"
          onError={(e) => {
            e.target.onerror = null;
            e.target.src = "https://placehold.co/600x400?text=Image+Not+Available";
          }}
        />
      </div>

      <div className="mt-4 bg-card border border-border rounded-md p-4 w-full shadow-md">
        <h2 className="text-2xl md:text-3xl font-bold mb-2">{event.event_name}</h2>
        <p className="text-copy-secondary">{event.event_description}</p>
      </div>

      <div className="my-4 grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="md:col-span-2">
          <div className="bg-card border border-border rounded-md p-4 grid grid-cols-1 md:grid-cols-2 gap-4 shadow-md">
            {/* Event Details */}
            <div className="col-span-1 md:col-span-2">
              <h2 className="text-xl md:text-2xl font-bold mb-2">Event Details</h2>
            </div>

            {/* Start Date */}
            {eventDetailsHelper({
              icon: <TbCalendarClock size={23} />,
              title: "Start Date",
              data: dateFormatter(event.event_start_date, 3),
            })}

            {/* End Date */}
            {eventDetailsHelper({
              icon: <TbCalendarClock size={23} />,
              title: "End Date",
              data: dateFormatter(event.event_end_date, 3),
            })}

            {/* Location */}
            {eventDetailsHelper({
              icon: <TbMapPin size={23} />,
              title: "Location",
              data: event.event_full_address,
            })}

            {/* Attendees */}
            {eventDetailsHelper({
              icon: <TbUsers size={23} />,
              title: "Attendees",
              data: `${event.event_attendees} / ${event.event_capacity}`,
            })}

            {/* Phone */}
            {eventDetailsHelper({
              icon: <TbPhone size={23} />,
              title: "Phone",
              data: `${event.event_contact_phone_prefix} ${event.event_contact_phone}`,
            })}

            {/* Email */}
            {eventDetailsHelper({
              icon: <TbMail size={23} />,
              title: "Email",
              data: event.event_contact_email,
            })}

            {/* Website */}
            {eventDetailsHelper({
              icon: <TbWorld size={23} />,
              title: "Website",
              data: event.event_website,
            })}

            {/* Created At */}
            {eventDetailsHelper({
              icon: <TbCalendar size={23} />,
              title: "Created At",
              data: dateFormatter(event.event_created_at, 3),
            })}

            {/* Modified At */}
            {eventDetailsHelper({
              icon: <TbCalendar size={23} />,
              title: "Modified At",
              data: dateFormatter(event.event_modified_at, 3),
            })}

            {/* Price */}
            {eventDetailsHelper({
              icon: <TbCash size={23} />,
              title: "Cost",
              data: `£${moneyFormatter(event.event_cost_in_pence)}`,
            })}

            {/* Tags */}
            <div className="flex flex-row space-x-3 items-start col-span-1 md:col-span-2">
              <div className="rounded-full p-2 bg-background w-fit h-fit">
                <TbTags size={23} />
              </div>
              <div>
                <p className="font-semibold">Tags</p>
                <div className="text-copy-secondary flex flex-wrap gap-2">{tagDisplayHelper(event.event_tags)}</div>
              </div>
            </div>
          </div>
        </div>

        <div className="">
          <div className="bg-card border border-border rounded-md p-4 flex flex-col justify-center items-center w-full h-full shadow-md">
            <div className="flex flex-col items-center">
              <h2 className="text-3xl md:text-5xl font-bold mb-2">£{moneyFormatter(event.event_cost_in_pence)}</h2>
              <p className="text-copy-secondary">per ticket</p>

              <div className="flex flex-col justify-center space-y-2">
                <button
                  className="p-3 bg-cta hover:bg-cta-active text-cta-text rounded-md font-semibold mt-5"
                  onClick={handle_EventPurchase}
                >
                  {event.event_cost_in_pence > 0 ? "Purchase Now" : "Signup Now"}
                </button>

                <button
                  onClick={toggleCalendarLinks}
                  className="p-3 bg-cta hover:bg-cta-active text-cta-text rounded-md font-semibold flex flex-row items-center"
                >
                  <TbCalendar className="mr-2" size={17} />
                  <span>Add to calendar</span>
                </button>
              </div>

              <AddToCalendar eventData={event} isOpen={showCalendarLinks} onClose={() => setShowCalendarLinks(false)} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Landing_EventDetails;

function eventDetailsHelper({ icon, title, data }) {
  return (
    <div className="flex flex-row space-x-3 items-center">
      <div className="rounded-full p-2 bg-background w-fit h-fit">{icon}</div>

      <div className="">
        <p className="font-semibold">{title}</p>
        <p className="text-copy-secondary">{data}</p>
      </div>
    </div>
  );
}

function tagDisplayHelper(tags) {
  return tags.map((tag, index) => {
    return (
      <span key={index} className="p-1 px-2 bg-background rounded-md">
        {tag}
      </span>
    );
  });
}

/*

- Get event id from link
- Fetch event by id
- Display event info
- Add to calendar
- Pay for the event

Optional:
- Share event

*/
