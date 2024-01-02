import { createAction, createSlice } from "@reduxjs/toolkit";

const initialState={
    loading: false,
    hostel: [],
    error: null
}

export const getHostel = createAction('hostel/detail')

const hostelDetailSlice = createSlice({
    name: 'hostelDetail',
    initialState,
    reducers:{
        detailLoading: (state)=>{
            state.loading= true
        },
        detailSuccess:(state, action)=>{
            state.loading=false;
            state.hostel= action.payload;
            state.error= null;
        },
        detailerror:(state, action)=>{
            state.loading=false;
            state.hostel= [];
            state.error= action.payload;
        }
    }
})

export const { detailLoading,detailSuccess, detailerror}= hostelDetailSlice.actions;
export default hostelDetailSlice.reducer;