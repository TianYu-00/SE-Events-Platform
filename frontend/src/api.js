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

export const createEvent = async (eventData) => {
  const data = {
    event_name: eventData.eventName,
    event_start_date: eventData.eventStartDate,
    event_end_date: eventData.eventEndDate,
    event_full_address: eventData.eventAddress,
    event_description: eventData.eventDescription,
    event_organizer_id: eventData.eventOrganizerUserId,
    event_capacity: eventData.eventCapacity,
    event_attendees: eventData.eventAttendees,
    event_cost_in_pence: eventData.eventCostInPence,
    event_contact_email: eventData.eventContactEmail,
    event_contact_phone_prefix: eventData.eventContactPhonePrefix,
    event_contact_phone: eventData.eventContactPhone,
    event_website: eventData.eventWebsite,
    event_tags: eventData.eventTags,
    event_thumbnail: eventData.eventThumbnail,
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
    const data = { event_id: listOfEventIds };
    const response = await api.delete(`/events`, { data });
    return response.data;
  } catch (error) {
    throw error;
  }
};
