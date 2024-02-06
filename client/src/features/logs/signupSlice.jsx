import { createSlice, createAction } from "@reduxjs/toolkit";

const initialState = {
  loading: false,
  success: false,
  user: null,
  error: null,
  status: null,
  message: null,
  code: null,
};

export const signup = createAction("user/signup");

const signupSlice = createSlice({
  name: "signup",
  initialState,
  reducers: {
    startLoading: (state) => {
      state.loading = true;
      state.error = null;
    },
    signupSuccess: (state, action) => {
      state.user = action.payload.user; // Update with the actual payload structure
      state.success = true;
      state.loading = false;
      state.error = null;
      state.status = action.payload.status;
      state.message = action.payload.message;
      state.code = action.payload.code;
    },
    signupError: (state, action) => {
      state.success = false;
      state.user = null;
      state.loading = false;
      state.error = action.payload.error; // Update with the actual payload structure
      state.status = action.payload.status;
      state.message = action.payload.message;
      state.code = action.payload.code;
    },
  },
});

export const { startLoading, signupSuccess, signupError } = signupSlice.actions;
export default signupSlice.reducer;
