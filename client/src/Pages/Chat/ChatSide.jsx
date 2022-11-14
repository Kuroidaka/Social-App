import { faPhone } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classNames from 'classnames/bind';
// import { useEffect } from 'react';
import { Fragment, useState, useRef } from 'react';

import styles from './Chat.module.scss'
// import { socket } from '../../services/socket';
import ChatInput from './ChatInput';
const cx = classNames.bind(styles)


const ChatSide = (props) => {
    const {currentChat} = props
    const [chatContent, setChatContent] = useState([])
    const chatBoxRef = useRef()

    console.log(currentChat);
    // useEffect(() => {
    //     socket.on('receive_mes', messageData => {
    //         setChatContent(prev => [...prev, messageData])

    //     })
    //     return () => {
    //         socket.off('receive_mes')
    //     }
    // }, [socket]) 
    // useEffect(() => {
    //     if(chatContent.length !== 0){
    //             chatBoxRef.current.scrollTop = chatBoxRef.current.scrollHeight 
    //     }

    // },[chatContent])

    return (
        <div className={cx("chat-side")}>
          {currentChat 
            ?<Fragment>
                <div className={cx("box_chat-header")}>
                    <div className={cx("user_info")}>
                        <img className={cx("user_info-avatar")} src={currentChat.info.avatarUrl} alt=""/>
                        
                        <div className={cx("user_info-name-wrapper")}>
                            <div className={cx("user_info-name")}>{currentChat.info.name}</div>
                            <div className={cx("active")}>Active 2h ago</div>
                        </div>
    
                    </div>
    
                    <div className={cx("action-box")}>
                        <FontAwesomeIcon className={cx("call")} icon={faPhone} />
                    </div>
                </div>
                                            
                <div ref={chatBoxRef} className={cx("box_chat-body")}>
                {chatContent.map((chat, idx) => {
                    return (
                        <div 
                        className={chat.authorId === currentChat._id? cx('other-chat') : cx('me-chat')} 
                        key={idx}>
                            <div className={cx("chat-content-wrapper")}>
                                <div className={cx("chat-content")}>{chat.mes}</div>
                            </div>
                        </div>
                    )
                })}
                       
    
                        {/* <div className={cx("other-chat")}>
                            <div className={cx("chat-content-wrapper")}>
                                <div className={cx("chat-content")}>dạo này trình giao tiếp  m sao r</div>
                            </div>
                        </div>
                     */}
                </div>
    
                <div className={cx("box_chat-footer")}>
                     <ChatInput />
                </div>
           </Fragment>
            :<>
            {/* some interface */}
            </>   
            }   
        </div>

      );
}
 
export default ChatSide;