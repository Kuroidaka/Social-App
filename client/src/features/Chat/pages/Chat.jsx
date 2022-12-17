import { useState } from "react";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";


import chatApi from "../../../api/chatApi";
import ChatSide from '../Components/ChatSide'
import Contact from "../Components/Contact";
import Welcome from "../Components/Welcome";

const Chat = () => {
    // const allUser = useSelector(state => state.user.allUser)
    const currentUser = useSelector(state => state.auth.login.currentUser)
    const [userList, setUserList] = useState(undefined)
    const [currentChat, setCurrentChat] = useState()

    const getConservations = async () => {
        const sender = currentUser._id
        await chatApi.getConservations(sender)
        .then((res) => {
            setUserList(res)
        })
    }

    useEffect(() => {
        getConservations()
    }, [])

    const handleChangeChat = (user) => {

        setCurrentChat(user)
    }

    return (  
    <Container >
        <div className="chat-box">
            <Contact userList={userList} changeChat={handleChangeChat}/>
            {currentChat === undefined ?(
                    <Welcome />
                ) : (
                    <ChatSide currentChat={currentChat} userList={userList} />
                )}
        </div>
    </Container>
    )
}
export default Chat;


const Container = styled.div`
display: flex;
justify-content: center;
align-items: center;
width: 100vw;
height: 100vh;
    .chat-box{
        width: 1200px;
        height: 80vh;
        border: 1px solid #D7D7D7;
        border-radius: 10px;
        display: grid;
        grid-template-columns: 30% 70%;
        overflow: hidden;
    }
`


    {/* <ChatSide curConservation={curConservation} messages={messages}/> */}

// const [chatList, setChatList] = useState([])
// const [load, setLoad] = useState(true)
// const [ messages, setMessages ] = useState([])
// const currentUser = useSelector(state => state.auth.login?.currentUser)
// const curConservation = useSelector(state => state.con?.curConservation)

// useEffect(() => {
//     console.log('api chat');
//     const userId = currentUser._id
//     axios.get(`/conversation?userId=${userId}`)
//    .then(res => {
//         setChatList(res.data)
//         setLoad(false)
//         return res.data
//    })
//    .then(async (res) => {
//     await res.map(async data => {
//        const KQ = await axios.get(`/conversation/${data._id}`)
       
//        const formData = {
//             conversationId: data._id,
//             mes: [KQ.data]
//        }
//        setMessages(prev => [...prev, formData])
//     })
//     // 
//    })
// }, [])

