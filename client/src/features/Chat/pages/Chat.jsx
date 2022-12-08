
import axios from "axios";
import classNames from "classnames/bind";
import { useEffect } from "react";
import { useState } from "react";
import { useSelector } from "react-redux";

// import { Routes, Route } from 'react-router-dom'

import styles from '../Chat.module.scss'
import ChatSide from "../Components/ChatSide";
import UserSide from "../Components/UserSide";
const cx = classNames.bind(styles)

const Chat = () => {

    const [chatList, setChatList] = useState([])
    const [load, setLoad] = useState(true)
    const [ messages, setMessages ] = useState([])
    const currentUser = useSelector(state => state.auth.login?.currentUser)
    const curConservation = useSelector(state => state.con?.curConservation)
    
    useEffect(() => {
        console.log('api chat');
        const userId = currentUser._id
        axios.get(`/conversation?userId=${userId}`)
       .then(res => {
            setChatList(res.data)
            setLoad(false)
            return res.data
       })
       .then(async (res) => {
        await res.map(async data => {
           const KQ = await axios.get(`/conversation/${data._id}`)
           
           const formData = {
                conversationId: data._id,
                mes: [KQ.data]
           }
           setMessages(prev => [...prev, formData])
        })
        // 
       })
    }, [])




    return (  

            <div className={cx("chat-box-page")}>
                {load 
                ?<div className="loading">Loading....</div>
                :
                <div className={cx("chat-box")}>
                    <UserSide chatList={chatList} />
                    <ChatSide curConservation={curConservation} messages={messages}/>
                </div>
                }
            </div>


    )
}
export default Chat;