import { createSlice } from "@reduxjs/toolkit"

export const postSlice = createSlice({
    name: 'post',
    initialState:{
        posts: [],
    },
    reducers: {
        storePost(state, action){
            state.posts = [action.payload]
        },
        addPost(state, action){
            state.posts = [...state.posts, action.payload]
        },
        deletePost(state, action){
            state.posts = state.posts.filter( post => post._id !== action.payload )
        }
    }

}) 

export const { storePost, addPost, deletePost } = postSlice.actions
export default postSlice.reducer