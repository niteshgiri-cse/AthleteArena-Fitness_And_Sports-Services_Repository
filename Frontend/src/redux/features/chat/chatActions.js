
import {
  chatRequest,
  chatSuccess,
  chatFailure,
  addUserMessage,
} from "./chatReducer";

import { sendChatMessageAPI } from "@/api/chatApi";

const HIGH_TRAFFIC_MESSAGE =
  "We're currently experiencing high traffic. Please try again in a few moments. Thank you for your patience!";

export const sendChatMessageAction = (message) => async (dispatch) => {
  dispatch(addUserMessage(message));
  dispatch(chatRequest());

  try {
    const data = await sendChatMessageAPI(message);

    dispatch(chatSuccess(data));

    return data;
  } catch (error) {
    console.error(
      "AI CHAT ERROR:",
      error?.response?.data || error.message || error
    );

    const status = error?.response?.status;

    let errorMessage;

    if (!error.response) {
      // Network error or backend is unreachable
      errorMessage =
        "Unable to connect to AthleteArena AI. Please check your connection and try again.";
    } else if (
      status === 429 ||
      status === 500 ||
      status === 502 ||
      status === 503 ||
      status === 504
    ) {
      // AI provider busy, overloaded, or temporarily unavailable
      errorMessage = HIGH_TRAFFIC_MESSAGE;
    } else if (status === 401 || status === 403) {
      errorMessage =
        "Your session may have expired. Please log in again and retry.";
    } else {
      errorMessage =
        "Sorry, we couldn't process your message. Please try again in a few moments.";
    }

    dispatch(chatFailure(errorMessage));

    return null;
  }
};
