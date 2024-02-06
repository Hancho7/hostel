import { createSlice, createAction } from "@reduxjs/toolkit";

const initialState={
    loading: false,
    success: false,
    status:null,
    error: null,
    message: null,
    data:null,
}

export const adminSignIn = createAction("admin/signin")

const adminSignInSlice= createSlice({
    name: "adminSignIn",
    initialState,
    reducers:{
        signinStart:(state)=>{
            state.loading=true;
        },
        signinSuccess:(state,action)=>{
            state.loading=false;
            state.success=true;
            const {data, status ,message,code} = action.payload;
            state.data= data;
            state.message= message;
            state.code= code;
            state.status= status;
            
        },
        signinFail:(state,action)=>{
            state.loading=false;
            state.success= false;
            const { status ,message,code} = action.payload;
            state.message= message;
            state.code= code;
            state.status= status;
        }
    }
})

export const {signinFail,signinStart,signinSuccess}=  adminSignInSlice.actions;
export default adminSignInSlice.reducer;