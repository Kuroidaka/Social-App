import axios from "axios";

const axiosClient = axios.create({
    baseURL: process.env.SERVER_URL,
    headers: {
        'content-type': 'application/json'
    }
})

axiosClient.interceptors.request.use(config => {
    //handle token
    return config
})

axiosClient.interceptors.response.use(res => {
    if( res && res.data ){
        return res.data
    }

    return res
}, error => {
    //handle error
    throw error
})

export default axiosClient