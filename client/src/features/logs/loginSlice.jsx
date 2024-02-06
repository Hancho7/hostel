import { createSlice, createAction } from "@reduxjs/toolkit";

const initialState = {
  loading: false,
  isAuthenticated: false,
  status: null,
  message: null,
  code: null,
  user: null,
  error: false,
};
export const startLogin = createAction("auth/startLogin");
const authSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    loading: (state) => {
      state.loading = true;
    },
    loginSuccess: (state, action) => {
      state.status = action.payload.status;
      state.loading = false;
      state.code = action.payload.code;
      state.message = action.payload.message;
      state.isAuthenticated = true;
      state.user = action.payload.data;
      state.error = null;
    },
    loginError: (state, action) => {
      state.loading = false;
      state.isAuthenticated = false;
      state.error = true;
      state.user = null;      
      state.status = action.payload.status;
      state.code = action.payload.code;
      state.message = action.payload.message;
    },
    logout: (state) => {
      state.isAuthenticated = false;
      state.user = null;
      state.error = false;
    },
  },
});

export const { loading, loginSuccess, loginError, logout } = authSlice.actions;
export default authSlice.reducer;
