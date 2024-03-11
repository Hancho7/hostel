import { createSlice, createAction } from "@reduxjs/toolkit";

export const getUserBookAction = createAction("user/getbookings");

const initialState = {
  loading: false,
  data: null,
  error: null,
  getBookingSuccess: false,
};

const getUserBookSlice = createSlice({
  name: "getUserBooking",
  initialState,
  reducers: {
    getUserBookloading: (state) => {
      state.loading = true;
    },
    getUserBookSuccess: (state, action) => {
      state.data = action.payload;
      state.getBookingSuccess = true;
      state.error = null;
      state.loading = false;
    },
    getUserBookFailure: (state, action) => {
      state.error = action.payload;
      state.loading = false;
      state.data = null;
    },
  },
});

export const { getUserBookFailure, getUserBookSuccess, getUserBookloading } =
  getUserBookSlice.actions;
export default getUserBookSlice.reducer;
