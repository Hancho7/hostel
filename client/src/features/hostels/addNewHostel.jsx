import { createSlice, createAction } from "@reduxjs/toolkit";

const initialState = {
  loading: false,
  status: null,
  code: null,
  message: null,
  error: null,
  data: [],
  success: false,
  fail: false,
};

export const addNewHostelAction = createAction("hostels/add");

const addNewHostelSlice = createSlice({
  name: "addnewhostel",
  initialState,
  reducers: {
    addNewHostelLoading: (state) => {
      state.loading = true;
    },
    addNewHostelSuccess: (state, action) => {
      const { status, code, message, data } = action.payload;
      state.loading = false;
      state.status = status;
      state.code = code;
      state.message = message;
      state.data = data || [];
      state.success = true;
    },
    addNewHostelFail: (state, action) => {
      state.loading = false;
      const { status, code, message, error } = action.payload;
      state.error = error || [];
      state.status = status;
      state.code = code;
      state.message = message;
    },
    clearAddNewHostel: (state) => {
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

export default addNewHostelSlice.reducer;

// Action Creators
export const {
  addNewHostelLoading,
  addNewHostelSuccess,
  addNewHostelFail,
  clearAddNewHostel,
} = addNewHostelSlice.actions;
