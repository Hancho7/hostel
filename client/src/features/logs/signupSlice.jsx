import { createSlice, createAction } from "@reduxjs/toolkit";

const initialState ={
    loading: false,
    user: null,
    error: null
}

export const signup = createAction('user/signup')

const SignupSlice = createSlice({
    name: 'signup',
    initialState,
    reducers:{
        loading: (state)=>{
            state.loading= true;
        },
        signupSuccess: (state, action)=>{
            state.user=action.payload;
            state.loading= false;
            state.error= null;
        },
        error:(state, action)=>{
            state.user= null;
            state.loading= false;
            state.error= action.payload
        }
    }
})

export const {loading, signupSuccess, error} = SignupSlice.actions
export default SignupSlice.reducer