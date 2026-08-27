import {
  chatRequest,
  chatSuccess,
  chatFailure,
  addUserMessage,
} from "./chatReducer";

import { sendChatMessageAPI } from "@/api/chatApi";

export const sendChatMessageAction =
  (message) => async (dispatch) => {
    try {
      dispatch(addUserMessage(message));
      dispatch(chatRequest());

      let conversationId = localStorage.getItem(
        "athleteArenaConversationId"
      );

      if (!conversationId) {
        conversationId = crypto.randomUUID();

        localStorage.setItem(
          "athleteArenaConversationId",
          conversationId
        );
      }

      const data = await sendChatMessageAPI(
        message,
        conversationId
      );

      dispatch(chatSuccess(data));

      return data;
    } catch (error) {
      console.error(
        "AI CHAT ERROR:",
        error?.response?.data || error
      );

      const responseData = error?.response?.data;

      const errorMessage =
        typeof responseData === "string"
          ? responseData
          : responseData?.error ||
            "Unable to connect to AthleteArena AI.";

      dispatch(chatFailure(errorMessage));

      return null;
    }
  };