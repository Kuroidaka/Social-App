import { createSlice } from "@reduxjs/toolkit"

export const postSlice = createSlice({
    name: 'post',
    initialState:{
        posts: [],
        isPending: false,
        isError: false
    },
    reducers: {
        // createPostStart(state) {
        //     state.isPending = true
        //     state.posts.isError = false
        // },
        createPost(state, action){
            
            state.posts = [...state.posts, action.payload]
 
        },
        deleteStart(state) {
            state.isPending = true
            state.isError = false
        },
        deleteError(state) {
            state.isPending = false
            state.isError = true
        },
        destroyPost(state, action){
            console.log(state.posts);
            state.posts = state.posts.filter( post => post._id !== action.payload )
        }
    }

}) 

export const { 
    createPostStart, createPost, createPostError,
    deleteStart, destroyPost, deleteError } = postSlice.actions
export default postSlice.reducer