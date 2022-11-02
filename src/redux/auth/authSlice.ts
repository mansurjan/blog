import { createSlice } from "@reduxjs/toolkit";
import { AuthInitialState } from "../../interface/interface";

const initialState: AuthInitialState = {
  refreshToken: null,
  isLogged: false,
};

export const authSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    saveUser: (state, action) => {
      state.refreshToken = action.payload.refreshToken;
      state.isLogged = action.payload.isLogged;
    },
    userLogOut: (state) => {
      state.refreshToken = null;
      state.isLogged = false;
    },
  },
});

export const { saveUser, userLogOut } = authSlice.actions;

export default authSlice.reducer;
