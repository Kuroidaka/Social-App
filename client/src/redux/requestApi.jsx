// import { updateError, updateStart, updateSuccess, } from "./userSlice"
import {
        createPost,
        deleteStart, deleteError, destroyPost,} from './postSlice'
import { 
        loginSuccess,
        registerStart,registerError, 
        getUserStart, getUserSuccess, getUserError,
        updateUserStart, updateUserSuccess, updateUserError,
        logOutStart, logOutSuccess, logOutError, } from './authSlice'
import {
        getAllStart, getAll, getAllError,
        searchUserSuccess, deleteUserSuccess } from './userSlice'

import axios from 'axios'

export const updateUserInfo = async (userUpdated, dispatch, id, accessToken) => {
    dispatch(updateUserStart())
    try{
        const res = await axios.post('/user/updateInfo/'+id, userUpdated,
        {
            cookies: { accessToken: accessToken }
        })
        dispatch(updateUserSuccess(res.data))
    }
    catch{
        dispatch(updateUserError())
    }
}

export const register = async (user, dispatch) => {
    dispatch(registerStart())
    try{
        // await axios.post('/authem/register', user)
        // dispatch(registerSuccess())
        // navigate('/')
    }
    catch{
        dispatch(registerError())
    }
}

export const login = async (res, dispatch, navigate) => {
        await dispatch(loginSuccess(res.data))
     
}

export const LogOut = async (dispatch, id, accessToken, navigate) => {
    dispatch(logOutStart())
    try{
        await axios.post('/authem/logout/'+id,
        {
            headers: { token: `Bearer ${accessToken}` }
        })
        .then(()=> {dispatch(logOutSuccess())})       
        .then(()=> {navigate('/login')})
        
        
        
    }
    catch{
        dispatch(logOutError())
    }
}

export const getUser = async (dispatch, id) => {
    dispatch(getUserStart())
    try{
        const res = await axios.get('/user/getUser'+ id)
        dispatch(getUserSuccess(res.data))
        // navigate(`/Profile/${id}`)
    }
    catch{
        dispatch(getUserError())
    }
}


// POST 
export const Post = async (dispatch, userId, newPost, formData) => {
    // dispatch(createPostStart())
    try{
        await console.log(formData.file);
            const resFile = await axios.post(`/file/upload/`, formData, {
                headers: {
                  'Content-Type': 'multipart/form-data'
                }
            })
            newPost = { ...newPost, imgUrl: resFile.data }
        
    const res = await axios.post('/post/createPost/'+ userId, newPost)

    await dispatch(createPost(res.data))
    }
    catch{
        // dispatch(createPostError())
    }
}

export const deletePost = async( dispatch, postId, userId, postUserId) => {
    dispatch(deleteStart())
    try{
        // const id = { userId, postId}

        // console.log(userId, '   --------    ', postUserId);
        await axios.delete(`/post/deletePost/${userId}/${postId}/${postUserId}` )
        dispatch(destroyPost(postId))

    }
    catch{
        dispatch(deleteError())
        console.log('delete error');
    }
} 

export const AllUsers = async (dispatch) => {
    dispatch(getAllStart())
    try{
        const res = await axios.get('/user/getAll')
        // console.log('dispatch in redux', res.data)
        dispatch(getAll(res.data))
    }
    catch{
        dispatch(getAllError())
    }
}


export const storageSearchUser = async (dispatch, storage) => {
    console.log(storage);
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