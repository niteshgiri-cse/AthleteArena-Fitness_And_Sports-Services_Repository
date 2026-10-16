
import { createSlice } from "@reduxjs/toolkit";

const WELCOME_MESSAGE =
  "Hey! 👋 I'm AthleteArena AI. How can I help you today?";

const initialState = {
  messages: [
    {
      id: 1,
      type: "ai",
      text: WELCOME_MESSAGE,
    },
  ],
  loading: false,
  error: null,
};

const chatSlice = createSlice({
  name: "chat",
  initialState,

  reducers: {
    chatRequest: (state) => {
      state.loading = true;
      state.error = null;
    },

    chatSuccess: (state, action) => {
      state.loading = false;
      state.error = null;

      const response = action.payload;

      state.messages.push({
        id: Date.now(),
        type: "ai",
        text:
          typeof response === "string"
            ? response
            : JSON.stringify(response ?? ""),
      });
    },

    chatFailure: (state, action) => {
      state.loading = false;

      const message =
        typeof action.payload === "string"
          ? action.payload
          : "Something went wrong. Please try again.";

      state.error = message;

      // Display the friendly error directly inside the chat
      state.messages.push({
        id: Date.now(),
        type: "ai",
        text: message,
        isError: true,
      });
    },

    addUserMessage: (state, action) => {
      state.messages.push({
        id: Date.now(),
        type: "user",
        text: action.payload,
      });
    },

    clearChat: (state) => {
      state.messages = [
        {
          id: 1,
          type: "ai",
          text: WELCOME_MESSAGE,
        },
      ];

      state.loading = false;
      state.error = null;
    },
  },
});

export const {
  chatRequest,
  chatSuccess,
  chatFailure,
  addUserMessage,
  clearChat,
} = chatSlice.actions;

export default chatSlice.reducer;
