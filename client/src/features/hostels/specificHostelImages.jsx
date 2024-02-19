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

export const specificHostelImagesAction = createAction("hostel/images");

const specificHostelImagesSlice = createSlice({
  name: "specificHostelImages",
  initialState,
  reducers: {
    specificHostelImagesLoading: (state) => {
      state.loading = true;
    },
    specificHostelImagesSuccess: (state, action) => {
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
    specificHostelImagesError: (state, action) => {
      let { code, status, message } = action.payload;
      state.code = code;
      state.status = status;
      state.message = message;
      state.error = true;
      state.loading = false;
    },
  },
});

export const { specificHostelImagesLoading, specificHostelImagesError, specificHostelImagesSuccess } =
  specificHostelImagesSlice.actions;
export default specificHostelImagesSlice.reducer;
