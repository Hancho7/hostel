import { createSlice, createAction } from '@reduxjs/toolkit';

export const verify = createAction('user/verify')

const verificationSlice = createSlice({
  name: 'verification',
  initialState: {
    loading: false,
    status:null,
    code:null,
    message:null,
    error: false,
    success: false,
  },
  reducers: {
    verificationRequested: (state) => {
      state.loading = true;
      state.error = null;
      state.success = false;
    },
    verificationSuccess: (state,action) => {
      state.loading = false;
      state.success = true;
      const {code, message, status}= action.payload
      state.status=status
      state.message=message
      state.code=code
    },
    verificationFailure: (state, action) => {
      state.loading = false;
      console.log('action.payload', action.payload)
      const {code, message, status}= action.payload
      state.status=status
      state.message=message
      state.code=code
      state.error = true;
    },
    
  },
});

export const {
  verificationRequested,
  verificationSuccess,
  verificationFailure,
} = verificationSlice.actions;

export default verificationSlice.reducer;
