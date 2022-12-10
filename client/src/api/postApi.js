import axiosClient from "./axiosClient";

const postApi = {
    getAll: () => {
        const url = '/post/getAll'
        
        return axiosClient.get(url)
    },
    getById: (id) => {
        const url = `/post/get/${id}`
        
        return axiosClient.get(url)
    },
    post: (newPost) => {
        const url = '/post/createPost/'
        return axiosClient.post(url, newPost)
    }
    
}

export default postApi