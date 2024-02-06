import { createSlice, createAction } from "@reduxjs/toolkit";

export const adminVerifyEmailAction = createAction("admin/verifyEmail");

const initialState = {
  success: false,
  // data: null,
  loading: false,
  error: null,
  status: null,
  message: null,
  code: null,
};

const adminEmailVerificationSlice = createSlice({
  name: "adminEmailVerification",
  initialState,
  reducers: {
    verificationStart: (state) => {
      state.loading = true;
    },
    verificationSuccess: (state, action) => {
        const { message, status, code } = action.payload;
        state.loading = false;
        state.success = true;        
        state.code= code;
        state.status = status;
        state.message = message;
        state.error = null;
        console.log('code', code)
        console.log('message', message)
        console.log('status', status)
    },
    verificationFail: (state, action) => {
      const { message, status, code, error } = action.payload;
      state.loading = false;
      state.success = false;
      state.message=message;
      state.code= code;
      state.error = error;
      console.log("-----------verification fail")
      console.log('code', code)
      console.log('message', message)
      console.log('status', status)
      console.log('error', error)
    },
  },
});

export const { verificationFail, verificationStart, verificationSuccess } =
  adminEmailVerificationSlice.actions;
export default adminEmailVerificationSlice.reducer;
