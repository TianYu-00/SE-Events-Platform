import React, { useState, useEffect } from "react";
import { useUser } from "@clerk/clerk-react";
import CustomInputTag from "../components/CustomInputTag";

function Landing_CreateEvent() {
  const { user } = useUser();

  const [eventData, setEventData] = useState({
    eventName: "",
    eventOrganizerUserId: user?.id || "",
    eventStartDate: "",
    eventEndDate: "",
    eventAddress: "",
    eventDescription: "",
    eventCapacity: "",
    eventAttendees: "0",
    eventCostInPence: "0",
    eventContactEmail: "",
    eventThumbnail: "",
    eventWebsite: "",
    eventContactPhonePrefix: "+44",
    eventContactPhone: "",
    eventTags: [],
  });
  const [imagePreview, setImagePreview] = useState(null);

  useEffect(() => {
    console.log(eventData.eventTags);
  }, [eventData]);

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setEventData((prevData) => ({
      ...prevData,
      [id]: value,
    }));
  };

  const handle_createEvent = async (event) => {
    event.preventDefault();
    console.log(eventData);
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];

    if (file) {
      setEventData((prevData) => ({
        ...prevData,
        eventThumbnail: file,
      }));

      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="flex justify-center">
      <div className="max-w-screen-xl flex justify-center w-full">
        <div className="max-w-screen-md w-full p-4 border border-border bg-card/70 rounded-lg shadow-lg">
          <form onSubmit={handle_createEvent} className="grid gap-7 grid-cols-2 mt-6">
            <div className="col-span-2">
              <h2 className="text-2xl font-semibold text-copy-primary">Create Event</h2>
            </div>

            <div>
              <label
                className="block text-sm font-medium text-copy-primary/80 ml-1 text-nowrap mb-1"
                htmlFor="eventName"
              >
                Event Name <span className="text-red-500">*</span>
              </label>
              <input
                id="eventName"
                type="text"
                value={eventData.eventName}
                onChange={handleInputChange}
                className="block w-full border-gray-300 rounded-md shadow-sm p-2 border focus:outline-none focus:border-border col-span-2"
                required
              />
            </div>

            <div>
              <label
                className="block text-sm font-medium text-copy-primary/80 ml-1 text-nowrap mb-1"
                htmlFor="eventOrganizerUserId"
              >
                Event Organizer ID <span className="text-red-500">*</span>
              </label>
              <input
                id="eventOrganizerUserId"
                type="text"
                value={eventData.eventOrganizerUserId}
                readOnly
                className="block w-full border-gray-300 rounded-md shadow-sm p-2 border focus:outline-none focus:border-border"
                required
              />
            </div>

            <div>
              <label
                className="block text-sm font-medium text-copy-primary/80 ml-1 text-nowrap mb-1"
                htmlFor="eventStartDate"
              >
                Event Start Date <span className="text-red-500">*</span>
              </label>
              <input
                id="eventStartDate"
                type="datetime-local"
                value={eventData.eventStartDate}
                onChange={handleInputChange}
                className="block w-full border-gray-300 rounded-md shadow-sm p-2 border focus:outline-none focus:border-border"
                required
              />
            </div>

            <div>
              <label
                className="block text-sm font-medium text-copy-primary/80 ml-1 text-nowrap mb-1"
                htmlFor="eventEndDate"
              >
                Event End Date <span className="text-red-500">*</span>
              </label>
              <input
                id="eventEndDate"
                type="datetime-local"
                value={eventData.eventEndDate}
                onChange={handleInputChange}
                className="block w-full border-gray-300 rounded-md shadow-sm p-2 border focus:outline-none focus:border-border"
                required
              />
            </div>

            <div className="col-span-2">
              <label
                className="block text-sm font-medium text-copy-primary/80 ml-1 text-nowrap mb-1"
                htmlFor="eventAddress"
              >
                Event Full Address <span className="text-red-500">*</span>
              </label>
              <input
                id="eventAddress"
                type="text"
                value={eventData.eventAddress}
                onChange={handleInputChange}
                className="block w-full border-gray-300 rounded-md shadow-sm p-2 border focus:outline-none focus:border-border"
                required
                placeholder="04 Placeholder Street Manchester UK M14 TES"
              />
            </div>

            <div className="col-span-2">
              <label
                className="block text-sm font-medium text-copy-primary/80 ml-1 text-nowrap mb-1"
                htmlFor="eventDescription"
              >
                Event Description <span className="text-red-500">*</span>
              </label>
              <textarea
                id="eventDescription"
                type="text"
                value={eventData.eventDescription}
                onChange={handleInputChange}
                className="block w-full border-gray-300 rounded-md shadow-sm p-2 border focus:outline-none focus:border-border min-h-[84px]"
                required
              />
            </div>

            <div>
              <label
                className="block text-sm font-medium text-copy-primary/80 ml-1 text-nowrap mb-1"
                htmlFor="eventCapacity"
              >
                Event Capacity <span className="text-red-500">*</span>
              </label>
              <input
                id="eventCapacity"
                type="number"
                value={eventData.eventCapacity}
                onChange={handleInputChange}
                className="block w-full border-gray-300 rounded-md shadow-sm p-2 border focus:outline-none focus:border-border"
                min="1"
                required
                placeholder="1"
              />
            </div>

            <div>
              <label
                className="block text-sm font-medium text-copy-primary/80 ml-1 text-nowrap mb-1"
                htmlFor="eventAttendees"
              >
                Event Attendees <span className="text-red-500">*</span>
              </label>
              <input
                id="eventAttendees"
                type="number"
                value={eventData.eventAttendees}
                onChange={handleInputChange}
                className="block w-full border-gray-300 rounded-md shadow-sm p-2 border focus:outline-none focus:border-border"
                min="0"
                required
                placeholder="0"
              />
            </div>

            <div>
              <label
                className="block text-sm font-medium text-copy-primary/80 ml-1 text-nowrap mb-1"
                htmlFor="eventCostInPence"
              >
                Event Cost In Pence <span className="text-red-500">*</span>
              </label>
              <input
                id="eventCostInPence"
                type="number"
                value={eventData.eventCostInPence}
                onChange={handleInputChange}
                className="block w-full border-gray-300 rounded-md shadow-sm p-2 border focus:outline-none focus:border-border"
                min="0"
                required
                placeholder="100"
              />
            </div>

            <div>
              <label
                className="block text-sm font-medium text-copy-primary/80 ml-1 text-nowrap mb-1"
                htmlFor="eventContactEmail"
              >
                Event Contact Email <span className="text-red-500">*</span>
              </label>
              <input
                id="eventContactEmail"
                type="email"
                value={eventData.eventContactEmail}
                onChange={handleInputChange}
                className="block w-full border-gray-300 rounded-md shadow-sm p-2 border focus:outline-none focus:border-border"
                required
                placeholder="tian@example.com"
              />
            </div>

            <div className="col-span-2">
              <label
                className="block text-sm font-medium text-copy-primary/80 ml-1 text-nowrap mb-1"
                htmlFor="eventThumbnail"
              >
                Event Thumbnail <span className="text-red-500">*</span>
              </label>

              {imagePreview && <img src={imagePreview} className="mb-2" />}

              <input
                id="eventThumbnail"
                type="file"
                onChange={handleFileChange}
                className="block w-full border-gray-300 rounded-md shadow-sm p-2 border focus:outline-none focus:border-border"
                required
              />
            </div>

            <div className="col-span-2">
              <label
                className="block text-sm font-medium text-copy-primary/80 ml-1 text-nowrap mb-1"
                htmlFor="eventWebsite"
              >
                Event Website
              </label>
              <input
                id="eventWebsite"
                type="url"
                value={eventData.eventWebsite}
                onChange={handleInputChange}
                className="block w-full border-gray-300 rounded-md shadow-sm p-2 border focus:outline-none focus:border-border"
                placeholder="https://example.com"
              />
            </div>

            <div>
              <label
                className="block text-sm font-medium text-copy-primary/80 ml-1 text-nowrap mb-1"
                htmlFor="eventContactPhonePrefix"
              >
                Event Contact Phone Prefix
              </label>
              <select
                id="eventContactPhonePrefix"
                value={eventData.eventContactPhonePrefix}
                onChange={handleInputChange}
                className="block w-full border-gray-300 rounded-md shadow-sm p-2 border focus:outline-none focus:border-border"
              >
                <option value="+44">+44 (UK)</option>
              </select>
            </div>

            <div>
              <label
                className="block text-sm font-medium text-copy-primary/80 ml-1 text-nowrap mb-1"
                htmlFor="eventContactPhone"
              >
                Event Contact Phone
              </label>
              <input
                id="eventContactPhone"
                type="tel"
                value={eventData.eventContactPhone}
                onChange={handleInputChange}
                className="block w-full border-gray-300 rounded-md shadow-sm p-2 border focus:outline-none focus:border-border"
                placeholder="07101010101"
              />
            </div>

            <div className="col-span-2">
              <label className="block text-sm font-medium text-copy-primary/80 ml-1 text-nowrap mb-1">Event Tags</label>
              <CustomInputTag
                tags={eventData.eventTags || []}
                setTags={(newTags) => setEventData({ ...eventData, eventTags: newTags })}
              />
            </div>

            <button className="bg-cta hover:bg-cta-active p-2 rounded-md text-cta-text w-full flex justify-center items-center col-span-2">
              <span>Create Event</span>
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Landing_CreateEvent;
