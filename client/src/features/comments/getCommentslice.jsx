import { createSlice, createAction } from "@reduxjs/toolkit";

export const readCommentAction = createAction('user/readComment')

const initialState ={
    loading: false,
    comments: null,
    error: null
}

const readCommentSlice = createSlice({
    name: 'readComment',
    initialState,
    reducers:{
        loading: (state)=>{
            state.loading= true;
        },
        comments: (state, action)=>{
            state.loading= false;
            state.comments= action.payload;
            state.error= null;
        },
        commentsError: (state, action)=>{
            state.loading= false;
            state.error= action.payload;
            state.comments= null;
        }
    }
})

export const {loading, comments, commentsError} = readCommentSlice.actions;
export default readCommentSlice.reducer;