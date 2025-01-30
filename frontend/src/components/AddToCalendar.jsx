import React from "react";
import { google, outlook, office365, yahoo, ics } from "calendar-link";
import Modal from "./Modal";
import { SiGooglecalendar } from "react-icons/si";
import { PiMicrosoftOutlookLogoBold } from "react-icons/pi";
import { FaYahoo, FaMicrosoft } from "react-icons/fa";
import { TiCalendar } from "react-icons/ti";

function AddToCalendar({ eventData, isOpen, onClose }) {
  const event = {
    title: eventData.event_name,
    description: eventData.event_description,
    start: eventData.event_start_date,
    end: eventData.event_end_date,
    location: `${eventData.event_street_address}, ${eventData.event_city_town}, ${eventData.event_postcode}`,
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} modalTitle={"Add To Calendar"}>
      <div className="flex flex-col space-y-4 p-4 max-w-96">
        <h2>
          Add <span className="font-semibold">{eventData.event_name}</span> to calendar
        </h2>
        <button
          onClick={() => window.open(google(event), "_blank")}
          className="bg-blue-600 hover:bg-blue-700 text-white p-3 rounded-md flex items-center space-x-2 transition duration-200"
        >
          <SiGooglecalendar size={20} />
          <span className="font-semibold">Google Calendar</span>
        </button>

        <button
          onClick={() => window.open(outlook(event), "_blank")}
          className="bg-blue-600 hover:bg-blue-700 text-white p-3 rounded-md flex items-center space-x-2 transition duration-200"
        >
          <PiMicrosoftOutlookLogoBold size={20} />
          <span className="font-semibold">Outlook</span>
        </button>

        <button
          onClick={() => window.open(office365(event), "_blank")}
          className="bg-blue-600 hover:bg-blue-700 text-white p-3 rounded-md flex items-center space-x-2 transition duration-200"
        >
          <FaMicrosoft size={20} />
          <span className="font-semibold">Office 365</span>
        </button>

        <button
          onClick={() => window.open(yahoo(event), "_blank")}
          className="bg-purple-600 hover:bg-purple-700 text-white p-3 rounded-md flex items-center space-x-2 transition duration-200"
        >
          <FaYahoo size={20} />
          <span className="font-semibold">Yahoo Calendar</span>
        </button>

        <button
          onClick={() => window.open(ics(event), "_blank")}
          className="bg-gray-500 hover:bg-gray-600 text-white p-3 rounded-md flex items-center space-x-2 transition duration-200"
        >
          <TiCalendar size={20} />
          <span className="font-semibold">Download ICS file</span>
        </button>
      </div>
    </Modal>
  );
}

export default AddToCalendar;
