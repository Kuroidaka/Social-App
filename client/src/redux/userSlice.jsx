import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
    name: 'user',
    initialState: {
        allUser:[],
        storageSearch: [],
        currentUser: null,
        pending: false,
        error: false,
        success: false
    },
    reducers: {
        getAllStart(state) {
            state.pending = true
            state.error = false
            state.success = false
        },
        getAll(state, action) {
            state.allUser = [ ...action.payload ]
            state.pending = false
            state.error = false
            state.success = true
        },
        getAllError(state) {
            state.pending = false
            state.error = true
            state.success = false
        },
        getUserStart(state) {
            state.pending = true
            state.error = false
            state.success = false
        },
        getUserSuccess(state, action) {
            state.success = true
            state.currentUser = action.payload
        },
        getUserError(state) {
            state.pending = false
            state.error = true
            state.success = false
        },
        searchUserSuccess(state, action) {
            state.storageSearch.push({...action.payload})

        },
        deleteUserSuccess(state, action) {
            console.log(state.allUser);
            state.storageSearch = state.storageSearch.filter(user => {
               return user.username !== action.payload
            })
        }
    }
})

export const { 
    updateSuccess, updateStart, updateError, 
    getAllStart, getAll, getAllError,
    searchUserSuccess, deleteUserSuccess
} = userSlice.actions
export default userSlice.reducer