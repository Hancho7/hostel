import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    id: null
}


const hostelID = createSlice({
    name: 'hostelID',
    initialState,
    reducers:{
        addID: (state, action)=>{
            state.id= action.payload
        }
    }
})

export const {addID}= hostelID.actions
export default hostelID.reducer