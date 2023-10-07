import { createAction, createSlice } from "@reduxjs/toolkit";

const initialState={
    loading: false,
    hostel: [],
    error: null
}

export const getHostels = createAction('hostel/display')
const hostelSlice = createSlice({
    name: 'hostel',
    initialState,
    reducers:{
        loading: (state)=>{
            state.loading= true
        },
        hostelSuccess:(state, action)=>{
            state.loading=false;
            state.hostel= action.payload;
            state.error= null;
        },
        error:(state, action)=>{
            state.loading=false;
            state.hostel= [];
            state.error= action.payload;
        }
    }
})

export const { loading,hostelSuccess, error}= hostelSlice.actions;
export default hostelSlice.reducer;