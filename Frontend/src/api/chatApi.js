
import axios from "axios";
import BASE_URL from "@/config/api";

const chatAPI = axios.create({
  baseURL: BASE_URL,
  headers: {
    Accept: "text/plain",
  },
  timeout: 60000,
});

chatAPI.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");

    if (token && token !== "null" && token !== "undefined") {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => Promise.reject(error)
);

export const sendChatMessageAPI = async (message) => {
  const response = await chatAPI.post("/chat/live", message, {
    headers: {
      "Content-Type": "text/plain",
    },
  });

  return response.data;
};

export default chatAPI;
