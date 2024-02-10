import { createSlice, createAction } from "@reduxjs/toolkit";

const initialState = {
  loading: false,
  status: null,
  code: null,
  message: null,
  error: false,
  data: [],
  success: false,
  fail: false,
};

export const addNewHostelRoomAction = createAction("hostels/room/add");

const addNewHostelRoomSlice = createSlice({
  name: "addnewhostelRoom",
  initialState,
  reducers: {
    addNewHostelRoomLoading: (state) => {
      state.loading = true;
    },
    addNewHostelRoomSuccess: (state, action) => {
      const { status, code, message, data } = action.payload;
      state.loading = false;
      state.status = status;
      state.code = code;
      state.message = message;
      state.data = data || [];
      state.success = true;
    },
    addNewHostelRoomFail: (state, action) => {
      state.loading = false;
      const { status, code, message, error } = action.payload;
      state.error = error || [];
      state.status = status;
      state.code = code;
      state.message = message;
    },
    clearAddNewHostelRoom: (state) => {
      state.status = null;
      state.code = null;
      state.message = null;
      state.error = null;
      state.data = [];
      state.fail = false;
      state.success = false;
    },
  },
});

export default addNewHostelRoomSlice.reducer;

// Action Creators
export const {
  addNewHostelRoomLoading,
  addNewHostelRoomSuccess,
  addNewHostelRoomFail,
  clearAddNewHostelRoom,
} = addNewHostelRoomSlice.actions;
