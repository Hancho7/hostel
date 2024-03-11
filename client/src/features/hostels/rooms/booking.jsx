import {createSlice, createAction} from '@reduxjs/toolkit'

export const bookAction = createAction('user/book')

const initialState={
    loading: false,
    data: null,
    error: null,
    bookingSuccess: false
}

const bookSlice = createSlice({
    name: 'book',
    initialState,
    reducers:{
        bookloading:(state)=>{
            state.loading= true;
        },
        bookSuccess: (state, action)=>{
            state.data =action.payload;
            state.bookingSuccess= true
            state.error=null;
            state.loading=false;
        },
        bookFailure:( state, action)=>{
            state.error=action.payload;
            state.loading=false;
            state.data= null    
        }
    }
  
})

export const {bookFailure, bookSuccess,bookloading}= bookSlice.actions;
export default bookSlice.reducer;