import { useState } from "react";
import { useRef } from "react";
import { useContext } from "react";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import chatApi from "../../../api/chatApi";
import Avatar from '../../../Components/Avatar/Avatar'
import { SocketContext } from "../../../Context";
import ChatInput from "./ChatInput";

const ChatSide = (props) => {
    const { currentChat }= props
    const socket = useContext(SocketContext)
    const [mes, setMes] = useState([])
    const scrollRef = useRef()
    const currentUser = useSelector(state => state.auth.login.currentUser)

    console.log(mes);

    useEffect(() => {

        const getMessages = () => {
            const conversationId = currentChat.conversationId
            chatApi.getMessages(conversationId)
            .then(data => {
                setMes(data)
            })
        }
        // checkOnline()
        getMessages()
    }, [currentChat])

    useEffect(() => {
        if(socket.current){
            socket.current.on('receive-msg', data => {
                const newMes = [...mes]
                // console.log(newMes);
                newMes.push({
                    sender: data.sender,
                    message: {
                        text: data.text, 
                    }
                })
                // const result = mes.push(newData)
                setMes(newMes)

            })
        }
    }, [])

    useEffect(() => {
        scrollRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [mes])
 

    const handleSend = async (text) => {
            const data = {
                receive: currentChat._id, 
                sender: currentUser._id,
                text: text, 
            }
            const newMes = [...mes]
            newMes.push({
                receive: currentChat._id, 
                sender: currentUser._id,
                message: {
                    text: text, 
                }
            })
            setMes(newMes)
            socket.current.emit('send-msg', data)
            chatApi.send(data)
            .then((res) => {
                console.log(res);
                const lastMes = res._id
                const conversationId = res.conversationId
                const data = {
                    lastMes,
                    conversationId
                }
                chatApi.setLastMessage(data)
            })
            // await socket.emit('send_mes', messageData)
    }

    return (
    <Container>
        <header>
            <Info>
                <Avatar src={currentChat.info.avatarUrl} width='50px' />    
                <div>
                    <div className="name">{currentChat.info.name}</div>
                    <div className="online">{currentChat.online ? 'Online' : 'Offline'}</div>
                </div>
            </Info>
        </header>

        <div className="chat" >
            <div className="body">
        
                {mes.map((data, idx)=> {
                    return (
                    <div ref={scrollRef} key={idx} className={`${currentUser._id === data.sender? 'me' : 'other'}`}>
                        <div className="wrap">
                            <div className="chat-content">{data.message.text}</div>
                        </div>
                    </div>
                    )
                })}

                   
            </div>
        </div>

       <div className="bottom">
            <ChatInput handleSend={handleSend}/>
       </div>


    </Container>
    )
}

export default ChatSide;
 
const Container = styled.div`
    max-width: 840px;
    width: 100%;
    height: 100%;
    border-right: 1px solid #D7D7D7;
    position: relative;
    display: grid;
    grid-template-rows: 8% 84% 8%;

    header{
        height: 6.4vh;
        width: 100%;
        border-bottom: 1px solid #D7D7D7;
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 15px;
    }

    .chat{
        height: 67vh;

        .body{
            width: 100%;
            height: 100%;
            overflow-y: auto;
            padding: 10px;

            .other, .me{
                width: 100%;
                display: flex;
                .wrap{
                    padding: 0 20px;
                    display: flex;
                    align-items: center;
                    color: #2b2a2b;
                    border-radius: 50px;
                    height: 45px;
                    width: auto;
                    max-width: 500px;
                    .chat-content{
                        font-size: 14px;
                    }
                }
            }

            .other{
                justify-content: flex-start;
                .wrap{
                    background-color: #7ad1fc;
                    justify-content: center;
                }
            }
            
            .me{
                justify-content: flex-end;
                .wrap{
                    justify-content: flex-end;
                    background-color: #EFEFEF;
                }
            }
        }
    }

    .bottom{
        height: 6.4vh;
        width: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
    }
`   

const Info = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    /* avatar */

    div{
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        gap: .4rem;
        padding-left: 5px;
        .name{
            font-weight: 600;

        }
        .online{
            font-size: .87rem;
            color: #b4b4b4;


           
        }
    }
`

