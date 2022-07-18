import { createSlice } from "@reduxjs/toolkit";

const initialStateValue = {
  access: localStorage.getItem("access"),
  refresh: localStorage.getItem("refresh"),
  isAuthenticated: false,
  user: null,
};

export const userSlice = createSlice({
  name: "user",
  initialState: initialStateValue,
  reducers: {
    login: (state, action) => {
      localStorage.setItem("access", action.payload.access);
      state.access = action.payload.access;
      state.refresh = action.payload.refresh;
      state.isAuthenticated = true;
    },
    login_fail: (state, action) => {
      console.log("Login Fail");
      localStorage.removeItem("access");
      localStorage.removeItem("refresh");
      state.isAuthenticated = false;
    },
    signup: (state, action) => {
      localStorage.setItem("access", action.payload.access);
      state.access = action.payload.access;
      state.refresh = action.payload.refresh;
      state.isAuthenticated = false;
    },
    signup_fail: (state, action) => {
      console.log("Sign Up Fail");
      localStorage.removeItem("access");
      localStorage.removeItem("refresh");
      state.isAuthenticated = false;
    },
    logout: (state, action) => {
      console.log("Logout");
      localStorage.removeItem("access");
      localStorage.removeItem("refresh");
      state.access = null
      state.refresh = null
      state.user = null;
      state.isAuthenticated = false;
    },
    loadin: (state, action) => {
      state.user = action.payload;
    },
    loadin_fail: (state, action) => {
      state.user = null;
    },
    authenticated_success: (state, action) => {
      state.isAuthenticated = true;
    },
    authenticated_fail: (state, action) => {
      state.isAuthenticated = false;
    },
    activation_success: (state, action) => {
      state = state;
    },
    activation_fail: (state, action) => {
      state = state;
    },
    password_reset_success: (state, action) => {
      state = state;
    },
    password_reset_fail: (state, action) => {
      state = state;
    },
    password_reset_confirm_success: (state, action) => {
      state = state;
    },
    password_reset_confirm_fail: (state, action) => {
      state = state;
    },
    profilecreate: (state, action) => {
      state = state;
    },
    profilecreate_fail: (state, action) => {
      state = state;
    },
  },
});

export const {
  login,
  login_fail,
  loadin,
  loadin_fail,
  logout,
  authenticated_success,
  authenticated_fail,
  password_reset_fail,
  password_reset_success,
  password_reset_confirm_success,
  password_reset_confirm_fail,
  profilecreate,
  profilecreate_fail,
  signup,
  signup_fail,
  activation_success,
  activation_fail,
} = userSlice.actions;

export default userSlice.reducer;
