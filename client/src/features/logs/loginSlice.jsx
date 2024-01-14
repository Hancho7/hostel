import { createSlice, createAction } from "@reduxjs/toolkit";

const initialState = {
  loading: false,
  isAuthenticated: false,
  user: null,
  error: null,
};
export const startLogin = createAction('auth/startLogin');
const authSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    loading: (state)=>{
      state.loading= true;
    },
    loginSuccess: (state, action) => {
      state.loading= false;
      state.isAuthenticated = true;
      state.user = action.payload;
      state.error = null;
    },
    loginError: (state, action) => {
      state.loading= false;
      state.isAuthenticated = false;
      state.error = action.payload;
      state.user= null
    },
    logout: (state) => {
      state.isAuthenticated = false;
      state.user = null;
      state.error = null;
    },
  },
});

export const { loading,loginSuccess, loginError, logout } = authSlice.actions;
export default authSlice.reducer;
