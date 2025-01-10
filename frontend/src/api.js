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
    eventName: eventName,
    startDate: eventStartDate,
    endDate: eventEndDate,
    fullAddress: eventAddress,
    description: eventDescription,
    organizerUserId: eventOrganizerUserId,
    capacity: eventCapacity,
    attendees: eventAttendees,
    costInPence: eventCostInPence,
    contactEmail: eventContactEmail,
    contactPhonePrefix: eventContactPhonePrefix,
    contactPhone: eventContactPhone,
    website: eventWebsite,
    tags: eventTags,
    thumbnail: eventThumbnail,
  };
  try {
    const response = await api.post(`/events/create-event`, data);
    return response.data;
  } catch (error) {
    throw error;
  }
};
