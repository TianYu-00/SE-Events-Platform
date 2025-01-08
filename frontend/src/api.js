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

export const getAllEvents = async () => {
  try {
    const response = await api.get(`/events`);
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
