import { createAction, createSlice } from "@reduxjs/toolkit";

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

export const homePageGetHostelsAction = createAction("hostel/display");
const homePageGetHostelsSlice = createSlice({
  name: "homePageHostels",
  initialState,
  reducers: {
    homePageHostelsLoading: (state) => {
      state.loading = true;
    },
    homePageHostelsSuccess: (state, action) => {
      state.loading = false;
      let { data, code, status, message } = action.payload;
      state.data = data;
      state.code = code;
      state.status = status;
      state.message = message || "Request Successful";
      state.success = true;
      state.fail = false;
    },
    homePageHostelsFail: (state, action) => {
      state.loading = false;
      let { code, message, status } = action.payload;
      state.error = true;
      state.code = code;
      state.message = message;
      status.success = false;
      state.status = status;
    },
  },
});

export const {
  homePageHostelsLoading,
  homePageHostelsSuccess,
  homePageHostelsFail,
} = homePageGetHostelsSlice.actions;
export default homePageGetHostelsSlice.reducer;
