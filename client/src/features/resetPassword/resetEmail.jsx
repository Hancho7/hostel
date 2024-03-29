import { createSlice, createAction } from "@reduxjs/toolkit";

const initialState = {
  loading: false,
  emailSentSuccessfull: false,
  email: null,
  error: null,
};

export const forgottenEmail = createAction("user/forgotten-email");
const emailSlice = createSlice({
  name: "email",
  initialState,
  reducers: {
    loading: (state) => {
      state.loading = true;
    },
    emailSent: (state, action) => {
      state.emailSentSuccessfull= true,
      state.loading = false;
      state.email = action.payload;
      state.error = null;
    },
    emailError: (state, action) => {
      state.emailSentSuccessfull= false,
      state.loading = false;
      state.email = null;
      state.error = action.payload;
    },
  },
});

export const { loading, emailSent, emailError } = emailSlice.actions;
export default emailSlice.reducer;
