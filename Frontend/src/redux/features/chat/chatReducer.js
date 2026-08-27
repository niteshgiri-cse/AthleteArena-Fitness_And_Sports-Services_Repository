import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  messages: [
    {
      id: 1,
      type: "ai",
      text: "Hey! 👋 I'm AthleteArena AI. How can I help you today?",
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

      state.messages.push({
        id: Date.now(),
        type: "ai",
        text:
          typeof action.payload === "string"
            ? action.payload
            : JSON.stringify(action.payload),
      });
    },

    chatFailure: (state, action) => {
      state.loading = false;

      const message =
        typeof action.payload === "string"
          ? action.payload
          : "Something went wrong. Please try again.";

      state.error = message;

      state.messages.push({
        id: Date.now(),
        type: "ai",
        text: message,
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
          text: "Hey! 👋 I'm AthleteArena AI. How can I help you today?",
        },
      ];

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