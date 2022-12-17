import { useContext } from 'react';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';

import { SocketContext } from '../../../Context';
import chatApi from '../../../api/chatApi';

const ChatInput = (props) => {
    const {handleSend} = props
    const [text, setText] = useState('')
    const socket = useContext(SocketContext)
    const currentUser = useSelector(state => state.auth.login.currentUser)

    const handleInput = (e) => {
        setText(e.target.value)
    }

    const sendChat = (e) =>{
        if(e.key === 'Enter' && text.trim() !== ''){
            handleSend(text)
            setText('')
        }
    }

    return ( 
            <Wrap>
                <input type="text" 
                    value={text} 
                    className="input" 
                    onChange={handleInput}
                    onKeyPress={sendChat}
                   />
            </Wrap>
     );
}

const Wrap = styled.div `
background-color: #EFEEEF;
width: 86%;
height: 44px;
border-radius: 120px;
display: flex;
justify-content: flex-start;
align-items: center;
position: relative;

    input{
        color: rgb(108 106 106);
        border: none;
        background-color: transparent;
        border-radius: 120px;
        height: 100%;
        width: 90%;
        outline: none;
        padding: 15px;
        font-size: 15px;
    }
`
 
export default ChatInput;