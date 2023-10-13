import { createSlice, createAction } from "@reduxjs/toolkit";

const initialState= {
    loading: false,
    success: null,
    error: null,
}

export const resetPasswordAction = createAction("user/resetPassword");

const resetPassword = createSlice({
    name: "resetPassword",
    initialState,
    reducers:{
        loading:(state)=>{
            state.loading= true;
        },
        passwordSuccessful: (state, action)=>{
            state.loading= false;
            state.success= action.payload;
            state.error = null;
        },
        passwordError: (state, action)=>{
            state.loading= false;
            state.success= null;
            state.error = action.payload;
        }
    }
})

export const {loading, passwordSuccessful, passwordError} = resetPassword.actions;
export default resetPassword.reducer;