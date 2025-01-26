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
      <div className="flex flex-col space-y-2">
        <button
          onClick={() => window.open(google(event), "_blank")}
          className="bg-cta hover:bg-cta-active text-cta-text p-2 rounded-md flex items-center space-x-2"
        >
          <SiGooglecalendar size={17} />
          <span>Google Calendar</span>
        </button>

        <button
          onClick={() => window.open(outlook(event), "_blank")}
          className="bg-cta hover:bg-cta-active text-cta-text p-2 rounded-md flex items-center space-x-2"
        >
          <PiMicrosoftOutlookLogoBold size={17} />
          <span>Outlook</span>
        </button>

        <button
          onClick={() => window.open(office365(event), "_blank")}
          className="bg-cta hover:bg-cta-active text-cta-text p-2 rounded-md flex items-center space-x-2"
        >
          <FaMicrosoft size={17} />
          <span>Office 365</span>
        </button>

        <button
          onClick={() => window.open(yahoo(event), "_blank")}
          className="bg-cta hover:bg-cta-active text-cta-text p-2 rounded-md flex items-center space-x-2"
        >
          <FaYahoo size={17} />
          <span>Yahoo Calendar</span>
        </button>

        <button
          onClick={() => window.open(ics(event), "_blank")}
          className="bg-cta hover:bg-cta-active text-cta-text p-2 rounded-md flex items-center space-x-2"
        >
          <TiCalendar size={17} />
          <span>Download ICS file</span>
        </button>
      </div>
    </Modal>
  );
}

export default AddToCalendar;
