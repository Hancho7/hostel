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

export const allHostelsForUserAction = createAction("hostel/display/allHostelsForUser");
const allHostelsForUsersSlice = createSlice({
  name: "allHostelsForUser",
  initialState,
  reducers: {
    allHostelsForUserLoading: (state) => {
      state.loading = true;
    },
    allHostelsForUserSuccess: (state, action) => {
      state.loading = false;
      let { data, code, status, message } = action.payload;
      state.data = data;
      state.code = code;
      state.status = status;
      state.message = message || "Request Successful";
      state.success = true;
      state.fail = false;
    },
    allHostelsForUserFail: (state, action) => {
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
  allHostelsForUserLoading,
  allHostelsForUserSuccess,
  allHostelsForUserFail,
} = allHostelsForUsersSlice.actions;
export default allHostelsForUsersSlice.reducer;
