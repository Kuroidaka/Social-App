import { createSlice } from "@reduxjs/toolkit";

export const authSlice = createSlice({
    name: 'auth',
    initialState: {
        login: {
            isFetching: false,
            isError: false,
            isSuccess: false,
            currentUser: null,
        },
        user: {
            isFetching: false,
            isError: false,
            getUser: null
        },
        logOut: {
            isFetching: false,
            isError: false,
        }
        

       
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