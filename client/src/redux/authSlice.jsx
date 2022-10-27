import { createSlice } from "@reduxjs/toolkit";

export const authSlice = createSlice({
    name: 'auth',
    initialState: {
        register: {
            isFetching: false,
            isError: false,
            isSuccess: false
        },
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
         // register
        registerStart(state){
            state.register.isFetching = true
        },
        registerError(state){
            state.register.isFetching = false
            state.register.isError = true
            state.register.isSuccess = false
        },
        registerSuccess(state){
            state.register.isFetching = false
            state.register.isError = false
            state.register.isSuccess = true
        },
        // login
        loginStart(state){
            state.login.isFetching = true
            state.login.isError = false
            state.login.isSuccess = false
        },
        loginError(state){
            state.login.isFetching = false
            state.login.isError = true
            state.login.isSuccess = false
        },
        loginSuccess(state, action){
            state.login.isFetching = false
            state.login.isError = false
            state.login.isSuccess = true
            state.login.currentUser = action.payload
        },
        // logOut
        logOutStart(state){
            state.login.isFetching = true
        },
        logOutError(state){
            state.login.isFetching = false
            state.login.isError = true
            state.login.isSuccess = false
        },
        logOutSuccess(state, action){
            state.login.currentUser = null
            state.login.isFetching = false
            state.login.isError = false
            state.login.isSuccess = true
        },
        // update user info
        updateUserStart(state){
            state.login.isFetching = true
        },
        updateUserError(state){
            state.login.isFetching = false
            state.login.isError = true
            state.login.isSuccess = false
        },
        updateUserSuccess(state, action){
            state.login.currentUser = action.payload
            state.login.isFetching = false
            state.login.isError = false
            state.login.isSuccess = true
        },

    }
})

export const { 
    loginStart,loginError, loginSuccess,
    registerStart,registerError, registerSuccess, 
    updateUserStart, updateUserSuccess, updateUserError,
    getUserStart, getUserSuccess, getUserError,
    logOutStart, logOutSuccess, logOutError,
 } = authSlice.actions
export default authSlice.reducer