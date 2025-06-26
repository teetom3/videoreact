import { configureStore } from "@reduxjs/toolkit";
import commentsSlice from "./commentSlice";

export const store = configureStore({
  reducer: {
    comments: commentsSlice.reducer,
  },
});

export default store;
