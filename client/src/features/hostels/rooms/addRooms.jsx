import { createSlice, createAction } from "@reduxjs/toolkit";

export const addRoomAction = createAction("admin/addRooms");

const initialState = {
  loading: false,
  error: null,
  data: null,
  success: false,
};

const addRoom = createSlice({
  name: "addrooms",
  initialState,
  reducers: {
    addRoomLoading: (state) => {
      state.loading = true;
    },
    addRoomSuccess: (state, action) => {
      state.loading = false;
      state.data = action.payload;
      state.success = true;
    },
    addRoomError: (state, action) => {
      state.error = action.payload;
      state.loading = false;
      state.data = null;
      state.success = false;
    },
  },
});

export default addRoom.reducer;
export const { addRoomLoading, addRoomSuccess, addRoomError } = addRoom.actions;
