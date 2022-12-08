import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
    name: 'user',
    initialState: {
        allUser:[],
        storageSearch: [],
        currentUser: null,
        currentProfileUser: null
    },
    reducers: {
        getAll(state, action) {
            state.allUser = [ ...action.payload ]
        },
        getUserSuccess(state, action) {
            state.currentUser = action.payload
        },
        searchUserSuccess(state, action) {
            state.storageSearch.push({...action.payload})
        },
        deleteUserSuccess(state, action) {
            state.storageSearch = state.storageSearch.filter(user => {
               return user.username !== action.payload
            })
        },
        setCurrentProfileUserSuccess(state, action) {
            state.currentProfileUser = action.payload
        }
    }
})

export const { 
    updateSuccess, getAll, searchUserSuccess, deleteUserSuccess, setCurrentProfileUserSuccess
} = userSlice.actions
export default userSlice.reducer