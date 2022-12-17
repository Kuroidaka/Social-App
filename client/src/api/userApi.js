import axiosClient from "./axiosClient"

const userApi = {

    search: (params) => {
        const url = '/user/search'
        return axiosClient.get(url, { params }) 
    },
    getAll: (params) => {
        const url = '/user/getAll'
        return axiosClient.get(url)
    },
    get: (params) => {
        const url = '/user/getUser/'
        return axiosClient.get(url, {params}) 
    },
    edit: (data, userId) => {
        const url = '/user/updateInfo'
    
        return axiosClient.post(url, data, {
            params: {
                userId: userId
        }})
    },
    search: (params) => {
        const url = '/user/search'
        
        return axiosClient.get(url, {params})
    }
   

}

export default userApi