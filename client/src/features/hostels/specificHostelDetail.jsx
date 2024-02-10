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

export const specificHostelDetailAction = createAction("hostel/detail");

const specificHostelDetailSlice = createSlice({
  name: "specificHostelDetail",
  initialState,
  reducers: {
    specificHostelLoading: (state) => {
      state.loading = true;
    },
    specificHostelSuccess: (state, action) => {
      let { data, code, status, message } = action.payload;
      state.data = data;
      state.code = code;
      state.status = status;
      state.message = message || "Request Successful!";
      state.error = false;
      state.success = true;
      state.fail = false;
      state.loading = false;
    },
    specificHostelError: (state, action) => {
      let { code, status, message } = action.payload;
      state.code = code;
      state.status = status;
      state.message = message;
      state.error = true;
      state.loading = false;
    },
  },
});

export const { specificHostelLoading, specificHostelError, specificHostelSuccess } =
  specificHostelDetailSlice.actions;
export default specificHostelDetailSlice.reducer;
