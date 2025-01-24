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

export const getEvent = async (eventId) => {
  try {
    const response = await api.get(`/events/${eventId}`);
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
    event_name: eventData.event_name,
    event_start_date: eventData.event_start_date,
    event_end_date: eventData.event_end_date,
    event_full_address: eventData.event_full_address,
    event_description: eventData.event_description,
    event_organizer_id: eventData.event_organizer_id,
    event_capacity: eventData.event_capacity,
    event_attendees: eventData.event_attendees,
    event_cost_in_pence: eventData.event_cost_in_pence,
    event_contact_email: eventData.event_contact_email,
    event_contact_phone_prefix: eventData.event_contact_phone_prefix,
    event_contact_phone: eventData.event_contact_phone,
    event_website: eventData.event_website,
    event_tags: eventData.event_tags,
    event_thumbnail: eventData.event_thumbnail,
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

export const updateEvent = async (eventId, eventData) => {
  const data = {
    event_name: eventData.event_name,
    event_start_date: eventData.event_start_date,
    event_end_date: eventData.event_end_date,
    event_full_address: eventData.event_full_address,
    event_description: eventData.event_description,
    event_capacity: eventData.event_capacity,
    // event_attendees: eventData.event_attendees,
    event_cost_in_pence: eventData.event_cost_in_pence,
    event_contact_email: eventData.event_contact_email,
    event_contact_phone_prefix: eventData.event_contact_phone_prefix,
    event_contact_phone: eventData.event_contact_phone,
    event_website: eventData.event_website,
    event_tags: eventData.event_tags,
    event_thumbnail: eventData.event_thumbnail,
  };
  try {
    const response = await api.patch(`/events/${eventId}`, data);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const createPayment = async ({ eventId, userId }) => {
  try {
    const data = { event_id: eventId, user_id: userId };
    const response = await api.post(`/stripe/create-payment-intent`, data);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const verifyPayment = async ({ paymentIntentId, userId }) => {
  try {
    const data = { paymentIntentId: paymentIntentId, user_id: userId };
    const response = await api.post(`/stripe/verify-payment-intent`, data);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getAllPurchases = async ({ orderCreatedAt = undefined, userId = undefined }) => {
  try {
    const params = new URLSearchParams();
    if (orderCreatedAt) {
      params.append("order_created_at", orderCreatedAt);
    }
    if (userId) {
      params.append("user_id", userId);
    }
    const query = `/purchases${params.toString() ? `?${params.toString()}` : ""}`;
    const response = await api.get(query);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const createFreePurchase = async ({ userId, eventName, eventId }) => {
  try {
    const data = { user_id: userId, event_name: eventName, event_id: eventId };
    const response = await api.post(`/purchases/free`, data);
    return response.data;
  } catch (error) {
    throw error;
  }
};
