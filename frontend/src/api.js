import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:9090/api",
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

export const testApi = async () => {
  try {
    const response = await api.get(`/test`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getAllEvents = async ({ orderCreatedAt = undefined }) => {
  try {
    const params = new URLSearchParams();
    if (orderCreatedAt) {
      params.append("order_created_at", orderCreatedAt);
    }
    const query = `/events${params.toString() ? `?${params.toString()}` : ""}`;
    const response = await api.get(query);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const initializeUser = async (userId, publicMetadata) => {
  const data = { user_id: userId, user_publicMetadata: publicMetadata };
  try {
    const response = await api.post(`/users/initialize`, data);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const createEvent = async ({
  eventName,
  eventStartDate,
  eventEndDate,
  eventAddress,
  eventDescription,
  eventOrganizerUserId,
  eventCapacity,
  eventAttendees,
  eventCostInPence,
  eventContactEmail,
  eventThumbnail,
  eventWebsite,
  eventContactPhonePrefix,
  eventContactPhone,
  eventTags,
}) => {
  const data = {
    event_name: eventName,
    event_start_date: eventStartDate,
    event_end_date: eventEndDate,
    event_full_address: eventAddress,
    event_description: eventDescription,
    event_organizer_id: eventOrganizerUserId,
    event_capacity: eventCapacity,
    event_attendees: eventAttendees,
    event_cost_in_pence: eventCostInPence,
    event_contact_email: eventContactEmail,
    event_contact_phone_prefix: eventContactPhonePrefix,
    event_contact_phone: eventContactPhone,
    event_website: eventWebsite,
    event_tags: eventTags,
    event_thumbnail: eventThumbnail,
  };
  try {
    const response = await api.post(`/events`, data);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const deleteEvents = async ({ listOfEventIds }) => {
  try {
    const data = { eventIds: listOfEventIds };
    const response = await api.delete(`/events`, { data });
    return response.data;
  } catch (error) {
    throw error;
  }
};
