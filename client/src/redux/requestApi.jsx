// import { updateError, updateStart, updateSuccess, } from "./userSlice"
import {
        createPost,
        destroyPost,} from './postSlice'
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
        

import axios from 'axios'

export const updateUserInfo = async (userUpdated, dispatch, id, accessToken) => {

    const res = await axios.post('/user/updateInfo/'+id, userUpdated,
    {
        cookies: { accessToken: accessToken }
    })
    dispatch(updateUserSuccess(res.data))
   
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
export const Post = async (dispatch, userId, newPost, formData) => {


    const resFile = await axios.post(`/file/upload/`, formData, {
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    })
    newPost = { ...newPost, imgUrl: resFile.data }
        
    const res = await axios.post('/post/createPost/'+ userId, newPost)

    await dispatch(createPost(res.data))

}

export const deletePost = async( dispatch, postId, userId, postUserId) => {
    try{
        // const id = { userId, postId}

        // console.log(userId, '   --------    ', postUserId);
        await axios.delete(`/post/deletePost/${userId}/${postId}/${postUserId}` )
        dispatch(destroyPost(postId))

    }
    catch{
        console.log('delete error');
    }
} 

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

