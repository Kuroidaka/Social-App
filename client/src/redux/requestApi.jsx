// import { updateError, updateStart, updateSuccess, } from "./userSlice"
import { storePost, addPost, deletePost } from './postSlice'
import { 
        loginSuccess,
        getUserSuccess,
        updateUserSuccess,
        logOutSuccess, } from './authSlice'
import {
        getAll,
        searchUserSuccess, 
        deleteUserSuccess,
        setCurrentProfileUserSuccess } from './userSlice'
import {createCon, setCurChatUser} from './conservationSlice'
        
import { setLoad } from './loadSlice'

import axios from 'axios'

export const reduxUpdateUserInfo = async (data, dispatch) => {
    dispatch(updateUserSuccess(data))
}

export const login = async (data, dispatch, navigate) => {
    await dispatch(loginSuccess(data))
    navigate('/')
}

export const LogOut = async (dispatch, navigate) => {
    
    dispatch(logOutSuccess())
    navigate('/login')
}

export const getUser = async (dispatch, id) => {

    const res = await axios.get('/user/getUser'+ id)
    dispatch(getUserSuccess(res.data))
    // navigate(`/Profile/${id}`)
}
export const setCurrentProfileUser = async (dispatch, navigate, userId) => {
    dispatch(setCurrentProfileUserSuccess(userId))
    navigate(`/Profile/${userId}`)
}
// POST 
export const ReduxAddPost = async (dispatch, res) => {    
    // console.log(res);
   dispatch(addPost(res))
}

export const ReduxStorePost = async (dispatch, posts) => {
    dispatch(storePost(posts))
}

export const ReduxDeletePost = async( dispatch, postId ) => {
    dispatch(deletePost(postId))
} 

// export const deletePost = async( dispatch, postId ) => {
//     try{
//         dispatch(destroyPost(postId))
//     }
//     catch{
//         console.log('delete error');
//     }
// } 

export const AllUsers = async (dispatch) => {

    const res = await axios.get('/user/getAll')
    // console.log('dispatch in redux', res.data)
    dispatch(getAll(res.data))

}


export const storageSearchUser = async (dispatch, storage) => {
    try {
        dispatch(searchUserSuccess(storage))

    } catch (error) {
        console.log('storage failure', error);
    }
}

export const deleteStorage = async (dispatch, username) => {
    try {
        dispatch(deleteUserSuccess(username))
    } catch (error) {
        console.log('delelte failure', error);
    }
}

export const createChat = async (dispatch, data, navigate) => {
    const {user} = data

    dispatch(createCon(user._id))
    navigate && navigate(`/chat`)
}

export const setCurChat = async (dispatch, user) => {
    dispatch(setCurChatUser(user))

}



// loading

export const reduxSetLoad = (dispatch, bool) => {
    dispatch(setLoad(bool))
}