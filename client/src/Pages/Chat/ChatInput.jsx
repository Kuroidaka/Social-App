import classNames from 'classnames/bind';
import { useState } from 'react';

import styles from './Chat.module.scss'

// import { socket } from '../../services/socket';
import { useSelector } from 'react-redux';

const cx = classNames.bind(styles)


const ChatInput = (props) => {

    const [text, setText] = useState('')
    const currentUser = useSelector(state => state.auth.login.currentUser)

    const handleInput = (e) => {
        setText(e.target.value)
    }

    const handleSend = async (e) => {

        if(e.key === 'Enter'){
            const messageData = {
                authorId: currentUser._id,
                author: currentUser.username, 
                mes: text, 
            }
            setText('')
            // await socket.emit('send_mes', messageData)
        }

    }

    return ( 
        <div className={cx("input-box")}>
            <div className={cx("input-wrapper")}>
                <input type="text" 
                    value={text} 
                    className={cx("input")} 
                    onChange={handleInput}
                    onKeyPress={handleSend}/>
            </div>
        </div>
     );
}
 
export default ChatInput;