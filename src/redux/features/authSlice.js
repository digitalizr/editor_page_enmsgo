import { createSlice } from "@reduxjs/toolkit";
import Cookies from "js-cookie";

const initialState = {
  isAuthenticated: !!Cookies.get("user"),
  user: null,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setAuth: (state, action) => {
      state.isAuthenticated = true;
      state.user = {
        uid: action.payload.uid,
        displayName: action.payload.displayName,
        email: action.payload.email,
        photoURL: action.payload.photoURL,
      };
    },
    clearAuth: (state) => {
      state.isAuthenticated = false;
      state.user = null;
      Cookies.remove("authToken");
    },
  },
});

export const { setAuth, clearAuth } = authSlice.actions;
export default authSlice.reducer;
