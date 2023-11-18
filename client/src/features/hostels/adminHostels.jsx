import { createAction, createSlice } from "@reduxjs/toolkit";

const initialState = {
  loading: false,
  hostel: [],
  error: null,
};

export const adminGetHostels = createAction("admin/hostelDisplay");
const adminHostelSlice = createSlice({
  name: "adminHostel",
  initialState,
  reducers: {
    loadingAdminHostels: (state) => {
      state.loading = true;
    },
    adminHostelSuccess: (state, action) => {
      state.loading = false;
      state.hostel = action.payload;
      state.error = null;
    },
    adminHostelError: (state, action) => {
      state.loading = false;
      state.hostel = [];
      state.error = action.payload;
    },
  },
});

export const { loadingAdminHostels, adminHostelSuccess, adminHostelError } =
  adminHostelSlice.actions;
export default adminHostelSlice.reducer;
