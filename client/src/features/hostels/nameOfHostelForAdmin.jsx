import { createAction, createSlice } from "@reduxjs/toolkit";

export const nameOfHostelAction = createAction("admin/nameOfHostel");

const initialState = {
  loading: false,
  names: [],
  success: false,
  message: null,
  code: "",
  status: "",
  error: false,
};

const namesOfHostelSlice = createSlice({
  name: "namesOfHostel",
  initialState,
  reducers: {
    namesOfHostelLoading: (state) => {
      state.loading = true;
    },
    namesOfHostelSuccess: (state, action) => {
      let { data, message, code, status } = action.payload;
      state.code = code;
      state.message = message;
      state.status = status;
      state.names = data;
      state.success = true;
      state.loading = false;
    },
    namesOfHostelFail: (state, action) => {
      let { message, code, status } = action.payload;
      state.error = true;
      state.message = message;
      state.code = code;
      state.status = status;
      state.names = [];
      state.loading = false;
      state.success = false;
    },
  },
});

export const { namesOfHostelFail, namesOfHostelLoading, namesOfHostelSuccess } =
  namesOfHostelSlice.actions;
export default namesOfHostelSlice.reducer;
