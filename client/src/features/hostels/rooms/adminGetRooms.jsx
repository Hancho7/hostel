import { createSlice, createAction } from "@reduxjs/toolkit";

const initialState = {
  loading: false,
  rooms: [],
  error: null,
};
export const adminGetRooms = createAction("admin/getRooms");

const adminGetRoomSlice = createSlice({
  name: "adminGetRoom",
  initialState,
  reducers: {
    getAdminRoomsStarted: (state) => {
      state.loading = true;
    },
    getAdminRoomsSuccess: (state, action) => {
      state.loading = false;
      state.rooms = action.payload;
      state.error = null;
    },
    getAdminRoomsFailed: (state, action) => {
      state.loading = false;
      state.error = action.payload;
      state.rooms = null;
    },
  },
});

export const {getAdminRoomsStarted,getAdminRoomsSuccess, getAdminRoomsFailed} = adminGetRoomSlice.actions;
export default adminGetRoomSlice.reducer;