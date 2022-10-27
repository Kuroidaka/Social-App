import { faPhone } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import classNames from "classnames/bind";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

// import { Routes, Route } from 'react-router-dom'

import styles from './Chat.module.scss'
import ChatSide from "./ChatSide";
import UserSide from "./UserSide";
const cx = classNames.bind(styles)

const Chat = (props) => {
    const { user } = props
    const currentUser = useSelector(state => state.auth.login?.currentUser)

    const users = currentUser.chat

    return (  

            <div className={cx("chat-box-page")}>
                <div className={cx("chat-box")}>
                    <UserSide users={users}/>
                    <ChatSide />
                </div>
            </div>


    )
}
export default Chat;