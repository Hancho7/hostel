import { createSlice, createAction } from "@reduxjs/toolkit";

const initialState = {
  loading: false,
  status: null,
  code: null,
  message: null,
  error: false,
  success: false,
  fail: false,
};

export const userBookingRoomAction = createAction("hostels/room/booking");

const userBookingRoomSlice = createSlice({
  name: "userBookingRoom",
  initialState,
  reducers: {
    userBookingRoomLoading: (state) => {
      state.loading = true;
    },
    userBookingRoomSuccess: (state, action) => {
      const { status, code, message } = action.payload;
      state.loading = false;
      state.status = status;
      state.code = code;
      state.message = message;
      state.success = true;
    },
    userBookingRoomFail: (state, action) => {
      state.loading = false;
      const { status, code, message, error } = action.payload;
      state.error = error || [];
      state.status = status;
      state.code = code;
      state.message = message;
    },
    clearuserBookingRoom: (state) => {
      state.status = null;
      state.code = null;
      state.message = null;
      state.error = null;
      state.fail = false;
      state.success = false;
    },
  },
});

export default userBookingRoomSlice.reducer;

// Action Creators
export const {
  userBookingRoomLoading,
  userBookingRoomSuccess,
  userBookingRoomFail,
  clearuserBookingRoom,
} = userBookingRoomSlice.actions;
