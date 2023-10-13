import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    id: null
}


const commentID = createSlice({
    name: 'commentID',
    initialState,
    reducers:{
        addID: (state, action)=>{
            state.id= action.payload
        }
    }
})

export const {addID}= commentID.actions
export default commentID.reducer