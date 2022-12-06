import { faPhone } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classNames from 'classnames/bind';
import { Fragment, useState, useRef, useEffect } from 'react';

import styles from '../Chat.module.scss'
// import { socket } from '../../services/socket';
import ChatInput from './ChatInput';
import { useSelector } from 'react-redux';

const cx = classNames.bind(styles)


const ChatSide = (props) => {
    const {curConservation, messages} = props
    const [chats, setChats] = useState([])
    const [load, setLoad] = useState(true)
    const currentChat = useSelector(state => state.con.curChatUser)
    const chatBoxRef = useRef()
    console.log(curConservation);
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

    useEffect(() => {

        const getMes = () => {
            // console.log('conservationId: ', curConservation);
            const data = messages.find(mes =>{ 
                console.log('mes.conversationId :', mes.conversationId );
                console.log('curConservation :', curConservation );
                return mes.conversationId === curConservation})
            // setChats(data?.mes[0])
            console.log(data);
            return data 
        }
        getMes()


    }, [curConservation])

    

   

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
                    {chats && 
                    chats.map((chat, idx) => {
                        return (
                            <div 
                            className={chat.senderId === currentChat._id? cx('other-chat') : cx('me-chat')} 
                            key={idx}>
                                <div className={cx("chat-content-wrapper")}>
                                    <div className={cx("chat-content")}>{chat.text}</div>
                                </div>
                            </div>
                        )
                        })
                    }
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