import axios from "axios"

const fileApi = {

    post: (formData) => {
        const url = '/file/upload/'
        return axios.post( url, formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        })
    }
}

export default fileApi