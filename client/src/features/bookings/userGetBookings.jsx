import { createSlice, createAction } from "@reduxjs/toolkit";

const initialState = {
  loading: false,
  status: null,
  code: null,
  data: [],
  message: null,
  error: false,
  success: false,
  fail: false,
};

export const userGetBookingsAction = createAction("get/room/booking");

const userGetBookingsSlice = createSlice({
  name: "userGetBookings",
  initialState,
  reducers: {
    userGetBookingsLoading: (state) => {
      state.loading = true;
    },
    userGetBookingsSuccess: (state, action) => {
      const { status, code, message, data } = action.payload;
      state.loading = false;
      state.status = status;
      state.data = data;
      state.code = code;
      state.message = message;
      state.success = true;
    },
    userGetBookingsFail: (state, action) => {
      state.loading = false;
      const { status, code, message, error, data } = action.payload;
      state.error = error || [];
      state.data = data;
      state.status = status;
      state.code = code;
      state.message = message;
    },
  },
});

export default userGetBookingsSlice.reducer;

// Action Creators
export const {
  userGetBookingsLoading,
  userGetBookingsSuccess,
  userGetBookingsFail,
} = userGetBookingsSlice.actions;
