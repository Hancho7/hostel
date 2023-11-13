import { createAction, createSlice } from "@reduxjs/toolkit";

const initialState = {
    loading: false,
    bookingData: null,
    error: null,
}

export const getBookingsAction = createAction('admin/booking');

const getBookingSlice = createSlice({
    name: 'Bookings',
    initialState,
    reducers: {
        bookingsLoading: (state)=>{
            state.loading= true;
        },
        bookingDataSuccessful: (state, action)=>{
            state.loading= false;
            state.bookingData= action.payload;
            state.error= null;
        },
        bookingDataFailure: (state, action)=>{
            state.loading= false;
            state.bookingData= null;
            state.error= action.payload;
        }
    }
})

export const { bookingsLoading, bookingDataSuccessful, bookingDataFailure } = getBookingSlice.actions;
export default getBookingSlice.reducer