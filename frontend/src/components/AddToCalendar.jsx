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
    description: "Event to attend",
    start: eventData.event_start_date,
    end: eventData.event_end_date,
    location: eventData.event_full_address,
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} modalTitle={"Add To Calendar"}>
      <div className="space-y-2">
        <ul className="space-y-1">
          <li>
            <button
              onClick={() => window.open(google(event), "_blank")}
              className="p-2 bg-cta text-cta-text rounded-md hover:bg-cta-active flex justify-center items-center space-x-2"
            >
              <SiGooglecalendar size={17} />
              <span>Google Calendar</span>
            </button>
          </li>
          <li>
            <button
              onClick={() => window.open(outlook(event), "_blank")}
              className="p-2 bg-cta text-cta-text rounded-md hover:bg-cta-active flex justify-center items-center space-x-2"
            >
              <PiMicrosoftOutlookLogoBold size={17} />
              <span>Outlook</span>
            </button>
          </li>
          <li>
            <button
              onClick={() => window.open(office365(event), "_blank")}
              className="p-2 bg-cta text-cta-text rounded-md hover:bg-cta-active flex justify-center items-center space-x-2"
            >
              <FaMicrosoft size={17} />
              <span>Office 365</span>
            </button>
          </li>
          <li>
            <button
              onClick={() => window.open(yahoo(event), "_blank")}
              className="p-2 bg-cta text-cta-text rounded-md hover:bg-cta-active flex justify-center items-center space-x-2"
            >
              <FaYahoo size={17} />
              <span>Yahoo Calendar</span>
            </button>
          </li>
          <li>
            <button
              onClick={() => window.open(ics(event), "_blank")}
              className="p-2 bg-cta text-cta-text rounded-md hover:bg-cta-active flex justify-center items-center space-x-2"
            >
              <TiCalendar size={17} />
              <span>Download ICS file</span>
            </button>
          </li>
        </ul>
      </div>
    </Modal>
  );
}

export default AddToCalendar;
