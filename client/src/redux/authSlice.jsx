import { createSlice } from "@reduxjs/toolkit";

export const authSlice = createSlice({
    name: 'auth',
    initialState: {
        login: {
            currentUser: null,
        },
        user: {
            getUser: null
        },

       
    },
    reducers: {

        loginSuccess(state, action){
            state.login.currentUser = action.payload
        },
        logOutSuccess(state, action){
            state.login.currentUser = null
        },
        updateUserSuccess(state, action){
            state.login.currentUser = action.payload
        },

    }
})

export const { 
    loginSuccess, 
    updateUserSuccess,  
    getUserSuccess, 
    logOutSuccess,  
 } = authSlice.actions
export default authSlice.reducer