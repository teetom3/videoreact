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
      const index = state.comments.findIndex(
        (comment) => comment.id === action.payload
      );
      if (index !== -1) {
        state.comments.splice(index, 1);
      }
    },
  },
});

export const { addComment, removeComment } = commentsSlice.actions;

// Export par défaut du slice complet
export default commentsSlice;
