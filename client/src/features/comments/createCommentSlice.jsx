import { createSlice, createAction } from "@reduxjs/toolkit";

export const createCommentAction = createAction('user/createComment')

const initialState ={
    loading: false,
    comments: null,
    error: null
}

const createCommentSlice = createSlice({
    name: 'createComment',
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

export const {loading, comments, commentsError} = createCommentSlice.actions;
export default createCommentSlice.reducer;