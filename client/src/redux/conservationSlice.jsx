import { createSlice } from "@reduxjs/toolkit"

export const conservationSlice = createSlice({
    name: 'conservation',
    initialState:{
        curConservation: {},
        curChatUser: {}
    },
    reducers: {
        createCon(state, action){
            state.curConservation = action.payload
        },
        setCurChatUser(state, action){
            state.curChatUser = action.payload 
        }
       
    }

}) 

export const { createCon, setCurChatUser } = conservationSlice.actions
export default conservationSlice.reducer