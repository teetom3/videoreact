import { createSlice } from "@reduxjs/toolkit";

const commentsSlice = createSlice({
  name: "comments",
  initialState: {
    comments: [],
  },
  reducers: {
    addComment: (state, action) => {
      state.comments.push(action.payload);
    },
    removeComment: (state, action) => {
      state.comments = state.comments.filter(
        (comment) => comment.id !== action.payload
      );
    },
  },
});

export const { addComment, removeComment } = commentsSlice.actions;

// Export par défaut du slice complet
export default commentsSlice;
