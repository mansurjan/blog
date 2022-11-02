import { configureStore } from "@reduxjs/toolkit";
import postReducer from "../redux/post/postSlice";
import authReducer from "../redux/auth/authSlice";

export const store = configureStore({
  reducer: {
    posts: postReducer,
    auth: authReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
