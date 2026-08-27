import axios from "axios";
import BASE_URL from "@/config/api";

const chatAPI = axios.create({
  baseURL: BASE_URL,
});

chatAPI.interceptors.request.use((req) => {
  const token = localStorage.getItem("token");

  if (token && token !== "null" && token !== "undefined") {
    req.headers.Authorization = `Bearer ${token}`;
  }

  return req;
});

export const sendChatMessageAPI = async (message, conversationId) => {
  const res = await chatAPI.post("/chat/live", message, {
    headers: {
      "Content-Type": "text/plain",
      "Conversation-Id": conversationId,
    },
  });

  return res.data;
};