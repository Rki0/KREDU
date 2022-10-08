import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userSlice";
import lectureReducer from "./lectureSlice";

export const store = configureStore({
  reducer: {
    user: userReducer,
    lecture: lectureReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
