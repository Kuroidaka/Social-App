import { createSlice } from "@reduxjs/toolkit";

export const loadSlice = createSlice({
    name: 'load',
    initialState: {
        loading: false
    },
    reducers: {
        setLoad(state, action) {
            state.loading = action.payload
        }
    }
})

export const { setLoad } = loadSlice.actions
export default loadSlice.reducer