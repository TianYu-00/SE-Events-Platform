import React from "react";
import EventForm from "../components/EventForm";

function Landing_EditEvent({ eventData }) {
  return <EventForm initialEventData={eventData} isCreate={false} />;
}

export default Landing_EditEvent;
