import { createAction, createSlice } from "@reduxjs/toolkit";

export const uploadHostelAction = createAction("admin/uploadHostel")

const initialState = {
    loading: false,
    uploaded: null,
    success: false,
    error: null,
}

const uploadHostelSlice = createSlice({
    name: "uploadHostel",
    initialState,
    reducers: {
        uploadHostelLoading: (state)=>{
            state.loading= true;
        },
        uploadHostelSuccess: (state, action)=>{
            state.loading= false;
            state.success= true;
            state.uploaded = action.payload;
        },
        uploadHostelError: (state, action)=>{
            state.loading =  false;
            state.success = null;
            state.success= false;
            state.error = action.payload
        }
    }
})

export const {uploadHostelError, uploadHostelLoading, uploadHostelSuccess} = uploadHostelSlice.actions;
export default uploadHostelSlice.reducer;