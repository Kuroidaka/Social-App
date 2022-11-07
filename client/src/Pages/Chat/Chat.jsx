
import classNames from "classnames/bind";
import { useState } from "react";

// import { Routes, Route } from 'react-router-dom'

import styles from './Chat.module.scss'
import ChatSide from "./ChatSide";
import UserSide from "./UserSide";
const cx = classNames.bind(styles)

const Chat = (props) => {
    const { users } = props
    const [chatList, setChatList] = useState([])
    const [currentChat, setCurrentChat] = useState()
    // const currentUser = useSelector(state => state.auth.login?.currentUser)
    return (  

            <div className={cx("chat-box-page")}>
                <div className={cx("chat-box")}>
                    <UserSide setCurrentChat={setCurrentChat} users={users} chatList={chatList} setChatList={setChatList}/>
                    <ChatSide currentChat={currentChat}/>
                </div>
            </div>


    )
}
export default Chat;