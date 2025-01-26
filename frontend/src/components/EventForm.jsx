import React, { useState, useEffect } from "react";
import { useUser } from "@clerk/clerk-react";
import CustomInputTag from "../components/CustomInputTag";
import EventCard from "../components/EventCard";
import { cloudinaryUploadImage } from "../api_cloudinary";
import { createEvent, updateEvent } from "../api";
import UKCitiesList from "../utils/UKCitiesList";

function EventForm({ initialEventData = null, isCreate = true }) {
  const { user } = useUser();
  const eventDataTemplate = {
    event_name: "",
    event_start_date: "",
    event_end_date: "",
    event_street_address: "",
    event_city_town: "",
    event_postcode: "",
    event_description: "",
    event_organizer_id: user?.id || 1,
    event_capacity: "",
    event_attendees: "0",
    event_cost_in_pence: "0",
    event_contact_email: "",
    event_thumbnail: "",
    event_website: "",
    event_contact_phone_prefix: "+44",
    event_contact_phone: "",
    event_tags: [],
  };

  const [eventData, setEventData] = useState(initialEventData || eventDataTemplate);
  const [selectedImageFile, setSelectedImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);

  useEffect(() => {
    // console.log(eventData);
  }, [eventData]);

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setEventData((prevData) => ({
      ...prevData,
      [id]: value,
    }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];

    if (file) {
      setSelectedImageFile(file);

      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handle_createEvent = async (event) => {
    event.preventDefault();
    // console.log(eventData);
    try {
      if (!selectedImageFile) {
        console.error("No image file selected.");
        return;
      }

      if (selectedImageFile.size > 10 * 1024 * 1024) {
        throw new Error("File size exceeds 10MB.");
      }

      // console.log(selectedImageFile);
      const uploadImageResponse = await cloudinaryUploadImage({ file: selectedImageFile });
      console.log("Upload response:", uploadImageResponse);
      if (uploadImageResponse.secure_url) {
        eventData.event_thumbnail = uploadImageResponse.secure_url;
        const createEventResponse = await createEvent(eventData);
        console.log(createEventResponse);
      } else {
        console.log("secure url missing");
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handle_editEvent = async (event) => {
    event.preventDefault();
    try {
      if (selectedImageFile) {
        if (selectedImageFile.size > 10 * 1024 * 1024) {
          throw new Error("File size exceeds 10MB.");
        }

        const uploadImageResponse = await cloudinaryUploadImage({ file: selectedImageFile });

        if (uploadImageResponse.secure_url) {
          eventData.event_thumbnail = uploadImageResponse.secure_url;
        } else {
          throw new Error("Missing secure url from image upload.");
        }
      }

      const editEventResponse = await updateEvent(eventData.event_id, eventData);
      console.log(editEventResponse);
      setEventData(editEventResponse.data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="flex justify-center">
      <div className="hidden md:block w-[450px] mr-10">
        <EventCard
          event={{
            event_name: eventData.event_name,
            event_thumbnail: imagePreview || eventData.event_thumbnail,
            event_street_address: eventData.event_street_address,
            event_city_town: eventData.event_city_town,
            event_postcode: eventData.event_postcode,
            event_start_date: eventData.event_start_date,
            event_description: eventData.event_description,
            event_cost_in_pence: eventData.event_cost_in_pence,
            event_attendees: eventData.event_attendees,
            event_capacity: eventData.event_capacity,
          }}
        />
      </div>
      <div className="max-w-screen-md flex justify-center w-full">
        <div className="w-full p-4 border border-border bg-card/70 rounded-lg shadow-lg">
          <form onSubmit={isCreate ? handle_createEvent : handle_editEvent} className="grid gap-7 grid-cols-2 mt-6">
            <div className="col-span-2">
              <h2 className="text-2xl font-semibold text-copy-primary">{isCreate ? "Create Event" : "Edit Event"}</h2>
            </div>

            <div>
              <label
                className="block text-sm font-medium text-copy-primary/80 ml-1 text-nowrap mb-1"
                htmlFor="event_name"
              >
                Event Name <span className="text-red-500">*</span>
              </label>
              <input
                id="event_name"
                type="text"
                value={eventData.event_name}
                onChange={handleInputChange}
                className="block w-full rounded-md shadow-sm p-2 border border-border bg-card text-copy-primary focus:outline-none focus:border-border col-span-2"
                required
                autoComplete="new-off"
              />
            </div>

            <div>
              <label
                className="block text-sm font-medium text-copy-primary/80 ml-1 text-nowrap mb-1"
                htmlFor="event_organizer_id"
              >
                Organizer ID <span className="text-red-500">*</span>
              </label>
              <input
                id="event_organizer_id"
                type="text"
                value={eventData.event_organizer_id}
                readOnly
                className="block w-full rounded-md shadow-sm p-2 border border-border bg-card text-copy-primary focus:outline-none focus:border-border col-span-2"
                required
              />
            </div>

            <div>
              <label
                className="block text-sm font-medium text-copy-primary/80 ml-1 text-nowrap mb-1"
                htmlFor="event_start_date"
              >
                Start Date <span className="text-red-500">*</span>
              </label>
              <input
                id="event_start_date"
                type="datetime-local"
                value={
                  eventData.event_start_date ? new Date(eventData.event_start_date).toISOString().slice(0, 16) : ""
                }
                onChange={handleInputChange}
                className="block w-full rounded-md shadow-sm p-2 border border-border bg-card text-copy-primary focus:outline-none focus:border-border col-span-2"
                required
              />
            </div>

            <div>
              <label
                className="block text-sm font-medium text-copy-primary/80 ml-1 text-nowrap mb-1"
                htmlFor="event_end_date"
              >
                End Date <span className="text-red-500">*</span>
              </label>
              <input
                id="event_end_date"
                type="datetime-local"
                value={eventData.event_end_date ? new Date(eventData.event_end_date).toISOString().slice(0, 16) : ""}
                onChange={handleInputChange}
                className="block w-full rounded-md shadow-sm p-2 border border-border bg-card text-copy-primary focus:outline-none focus:border-border col-span-2"
                required
              />
            </div>

            <div className="col-span-2">
              <label
                className="block text-sm font-medium text-copy-primary/80 ml-1 text-nowrap mb-1"
                htmlFor="event_street_address"
              >
                Address Line 1 <span className="text-red-500">*</span>
              </label>
              <input
                id="event_street_address"
                type="text"
                value={eventData.event_street_address}
                onChange={handleInputChange}
                className="block w-full rounded-md shadow-sm p-2 border border-border bg-card text-copy-primary focus:outline-none focus:border-border col-span-2"
                required
                placeholder="11 Placeholder Street"
                autoComplete="new-off"
              />
            </div>

            <div className="col-span-2">
              <label
                className="block text-sm font-medium text-copy-primary/80 ml-1 text-nowrap mb-1"
                htmlFor="event_city_town"
              >
                City or town <span className="text-red-500">*</span>
              </label>
              <div>
                <input
                  id="event_city_town"
                  type="text"
                  value={eventData.event_city_town}
                  onChange={handleInputChange}
                  list="city-list"
                  className="block w-full rounded-md shadow-sm p-2 border border-border bg-card text-copy-primary focus:outline-none focus:border-border col-span-2"
                  required
                  placeholder="Manchester"
                  autoComplete="new-off"
                />
                <datalist id="city-list">
                  {UKCitiesList.map((city) => (
                    <option key={city} value={city} />
                  ))}
                </datalist>
              </div>
            </div>

            <div className="col-span-2">
              <label
                className="block text-sm font-medium text-copy-primary/80 ml-1 text-nowrap mb-1"
                htmlFor="event_postcode"
              >
                Post code <span className="text-red-500">*</span>
              </label>
              <input
                id="event_postcode"
                type="text"
                value={eventData.event_postcode}
                onChange={handleInputChange}
                className="block w-full rounded-md shadow-sm p-2 border border-border bg-card text-copy-primary focus:outline-none focus:border-border col-span-2"
                required
                placeholder="M12 345"
                autoComplete="new-off"
              />
            </div>

            <div className="col-span-2">
              <label
                className="block text-sm font-medium text-copy-primary/80 ml-1 text-nowrap mb-1"
                htmlFor="event_description"
              >
                Description <span className="text-red-500">*</span>
              </label>
              <textarea
                id="event_description"
                type="text"
                value={eventData.event_description}
                onChange={handleInputChange}
                className="block w-full rounded-md shadow-sm p-2 border border-border bg-card text-copy-primary focus:outline-none focus:border-border min-h-[84px]"
                required
              />
            </div>

            <div>
              <label
                className="block text-sm font-medium text-copy-primary/80 ml-1 text-nowrap mb-1"
                htmlFor="event_attendees"
              >
                Attendees <span className="text-red-500">*</span>
              </label>
              <input
                id="event_attendees"
                type="number"
                value={eventData.event_attendees}
                onChange={handleInputChange}
                className="block w-full rounded-md shadow-sm p-2 border border-border bg-card text-copy-primary focus:outline-none focus:border-border col-span-2"
                min="0"
                required
                placeholder="0"
              />
            </div>

            <div>
              <label
                className="block text-sm font-medium text-copy-primary/80 ml-1 text-nowrap mb-1"
                htmlFor="event_capacity"
              >
                Capacity <span className="text-red-500">*</span>
              </label>
              <input
                id="event_capacity"
                type="number"
                value={eventData.event_capacity}
                onChange={handleInputChange}
                className="block w-full rounded-md shadow-sm p-2 border border-border bg-card text-copy-primary focus:outline-none focus:border-border col-span-2"
                min="1"
                required
                placeholder="1"
              />
            </div>

            <div>
              <label
                className="block text-sm font-medium text-copy-primary/80 ml-1 text-nowrap mb-1"
                htmlFor="event_cost_in_pence"
              >
                Cost In Pence <span className="text-red-500">*</span>
              </label>
              <input
                id="event_cost_in_pence"
                type="number"
                value={eventData.event_cost_in_pence}
                onChange={handleInputChange}
                className="block w-full rounded-md shadow-sm p-2 border border-border bg-card text-copy-primary focus:outline-none focus:border-border col-span-2"
                min="0"
                required
                placeholder="100"
              />
            </div>

            <div>
              <label
                className="block text-sm font-medium text-copy-primary/80 ml-1 text-nowrap mb-1"
                htmlFor="event_contact_email"
              >
                Contact Email <span className="text-red-500">*</span>
              </label>
              <input
                id="event_contact_email"
                type="email"
                value={eventData.event_contact_email}
                onChange={handleInputChange}
                className="block w-full rounded-md shadow-sm p-2 border border-border bg-card text-copy-primary focus:outline-none focus:border-border col-span-2"
                required
                placeholder="tian@example.com"
                autoComplete="new-off"
              />
            </div>

            <div className="col-span-2">
              <label
                className="block text-sm font-medium text-copy-primary/80 ml-1 text-nowrap mb-1"
                htmlFor="event_thumbnail"
              >
                Thumbnail {isCreate && <span className="text-red-500">*</span>}
              </label>

              {/* {imagePreview && <img src={imagePreview} className="mb-2" />} */}

              <input
                id="event_thumbnail"
                type="file"
                onChange={handleFileChange}
                className="block w-full border-gray-300 rounded-md shadow-sm p-2 border focus:outline-none focus:border-border text-copy-primary"
                required={isCreate}
              />
            </div>

            <div className="col-span-2">
              <label
                className="block text-sm font-medium text-copy-primary/80 ml-1 text-nowrap mb-1"
                htmlFor="event_website"
              >
                Website
              </label>
              <input
                id="event_website"
                type="url"
                value={eventData.event_website}
                onChange={handleInputChange}
                className="block w-full rounded-md shadow-sm p-2 border border-border bg-card text-copy-primary focus:outline-none focus:border-border col-span-2"
                placeholder="https://example.com"
                autoComplete="new-off"
              />
            </div>

            <div>
              <label
                className="block text-sm font-medium text-copy-primary/80 ml-1 text-nowrap mb-1"
                htmlFor="event_contact_phone_prefix"
              >
                Country Code
              </label>
              <select
                id="event_contact_phone_prefix"
                value={eventData.event_contact_phone_prefix}
                onChange={handleInputChange}
                className="block w-full rounded-md shadow-sm p-2 border border-border bg-card text-copy-primary focus:outline-none focus:border-border col-span-2"
              >
                <option value="+44">+44 (UK)</option>
              </select>
            </div>

            <div>
              <label
                className="block text-sm font-medium text-copy-primary/80 ml-1 text-nowrap mb-1"
                htmlFor="event_contact_phone"
              >
                Phone
              </label>
              <input
                id="event_contact_phone"
                type="tel"
                value={eventData.event_contact_phone}
                onChange={handleInputChange}
                className="block w-full rounded-md shadow-sm p-2 border border-border bg-card text-copy-primary focus:outline-none focus:border-border col-span-2"
                placeholder="07101010101"
                autoComplete="new-off"
              />
            </div>

            <div className="col-span-2">
              <label className="block text-sm font-medium text-copy-primary/80 ml-1 text-nowrap mb-1">Tags</label>
              <CustomInputTag
                tags={eventData.event_tags || []}
                setTags={(newTags) => setEventData({ ...eventData, event_tags: newTags })}
              />
            </div>

            <button className="bg-cta hover:bg-cta-active p-2 rounded-md text-cta-text w-full flex justify-center items-center col-span-2">
              <span>{isCreate ? "Create Event" : "Update Event"}</span>
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default EventForm;
