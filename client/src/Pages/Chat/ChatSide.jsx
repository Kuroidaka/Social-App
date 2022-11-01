import { faPhone } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classNames from 'classnames/bind';

import styles from './Chat.module.scss'
const cx = classNames.bind(styles)


const ChatSide = () => {
    return (
        <div className={cx("chat-side")}>
        <div className={cx("box_chat-header")}>
            <div className={cx("user_info")}>
                <img className={cx("user_info-avatar")} src="https://www.pngarts.com/files/11/Avatar-Transparent-Image.png" alt=""/>
                
                <div className={cx("user_info-name-wrapper")}>
                    <div className={cx("user_info-name")}>Just do IT</div>
                    <div className={cx("active")}>Active 2h ago</div>
                </div>

            </div>

            <div className={cx("action-box")}>
                <FontAwesomeIcon className={cx("call")} icon={faPhone} />
            </div>
        </div>
                                    
        <div className={cx("box_chat-body")}>
                <div className={cx("me-chat")}>
                    <div className={cx("chat-content-wrapper")}>
                        <div className={cx("chat-content")}>dạo này trình giao tiếp của m sao r</div>
                    </div>
                </div>

                <div className={cx("other-chat")}>
                    <div className={cx("chat-content-wrapper")}>
                        <div className={cx("chat-content")}>dạo này trình giao tiếp  m sao r</div>
                    </div>
                </div>

                <div className={cx("other-chat")}>
                    <div className={cx("chat-content-wrapper")}>
                        <div className={cx("chat-content")}>dạo này trình giao til admwla m sao r</div>
                    </div>
                </div>
                <div className={cx("me-chat")}>
                    <div className={cx("chat-content-wrapper")}>
                        <div className={cx("chat-content")}>dạo này la m sao r</div>
                    </div>
                </div>

                <div className={cx("other-chat")}>
                    <div className={cx("chat-content-wrapper")}>
                        <div className={cx("chat-content")}>dạo này trình giao tiếp \awlk malwm lkdawmlk dawmkl admwla m sao r</div>
                    </div>
                </div>
            
        </div>

        <div className={cx("box_chat-footer")}>
                <div className={cx("input-box")}>
                    <div className={cx("input-wrapper")}>
                        <input type="text" className={cx("input")} />
                    </div>
                </div>
        </div>
    </div>

      );
}
 
export default ChatSide;