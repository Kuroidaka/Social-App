import axiosClient from "./axiosClient";

const authApi = {
    register: (newUser) => {
        const url = '/authem/register'

        return axiosClient.post(url, newUser )
    },
    login: (user) => {
        const url = '/authem/login'

        return axiosClient.post(url, user)
    },
    logout: () => {
        const url = '/authem/logout'

        return axiosClient.post(url)
    }
}

export default authApi