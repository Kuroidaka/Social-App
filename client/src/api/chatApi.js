import axiosClient from "./axiosClient";

const chatApi = {
    send: (data) => {
        const url = '/conversation/send'

        return axiosClient.post(url, data)
    },
    setLastMessage: (data) => {
        const url = '/conversation/setLastMessage'
        return axiosClient.post(url, data)
    },
    getConservations: (sender) => {
        const url = '/conversation'

        return axiosClient.get(url, {
            params: {
                sender: sender
            }
        })
    },
    getMessages: (conversationId) => {
        const url = '/conversation/get'

        return axiosClient.get(url, {
            params: {
                conversationId: conversationId
            }
        })
    },
}

export default chatApi