import { createSlice, createAction } from "@reduxjs/toolkit";

const initialState = {
  loading: false,
  success: false,
  data: null,
  error: null,
  status: null,
  message: null,
  code: null,
};

export const adminSignUpAction = createAction("admin/signup");

const adminSignupSlice = createSlice({
  name: "adminSignUp",
  initialState,
  reducers: {
    signUpStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    signUpSuccess: (state, action) => {
      const { message, status, data } = action.payload;
      state.loading = false;
      state.success = true;
      state.message = message;
      state.status = status;
      state.data = data;
    },
    signUpFail: (state, action) => {
      state.loading = false;
      let { msg, code } = action.payload;
      state.error = { msg: msg, code: code };
    },
  },
});
export const { signUpStart, signUpSuccess, signUpFail } =
  adminSignupSlice.actions;
export default adminSignupSlice.reducer;
