import { createSlice, createAction } from '@reduxjs/toolkit';

export const verify = createAction('user/verify')

const verificationSlice = createSlice({
  name: 'verification',
  initialState: {
    loading: false,
    error: null,
    success: false,
  },
  reducers: {
    verificationRequested: (state) => {
      state.loading = true;
      state.error = null;
      state.success = false;
    },
    verificationSuccess: (state) => {
      state.loading = false;
      state.success = true;
    },
    verificationFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    
  },
});

export const {
  verificationRequested,
  verificationSuccess,
  verificationFailure,
} = verificationSlice.actions;

export default verificationSlice.reducer;
