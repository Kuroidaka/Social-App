import axios from 'axios';
import classNames from 'classnames/bind';
import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import useDebounce from '../../../Hooks/useDebounce';
import { createChat, setCurChat} from '../../../redux/requestApi'
import styles from '../Chat.module.scss'
const cx = classNames.bind(styles)

const UserSide = (props) => {
    const { chatList } = props
    const [input, setInput] = useState('')
    const [userItem, setUserItem] = useState([])
    const deBounce = useDebounce(input, 500)
    const currentUser = useSelector(state => state.auth.login.currentUser)
    const dispatch = useDispatch()

    useEffect(() => {

       
        if (!deBounce) {
            setUserItem(deBounce)
        }
        if (!deBounce.trim()) return
        // setLoad(true)

        
        const fetchApi = async () => {
            try {
                const result = await axios.get(`/user/search`, {
                    params: {
                        key: deBounce
                    }
                })
                setUserItem(result.data)
                
                // setLoad(false)
            } catch (error) {
                console.log('fetch failure', error);
            }

        }
        fetchApi()
        
    }, [deBounce])

    const handleInput = (e) => {
        setInput(e.target.value)

    }

    // const handleAddChatList = (user) => {
    //     !chatList.some((existUser)=>{ return existUser._id === user._id })
    //     && setChatList(prev => [...prev, user])
    //     setCurrentChat(user)
    //     setUserItem([])
    //     setInput('')
    // }

    const handleSetCurrentChat = (user) => {
        setCurChat(dispatch, user)
        console.log(user);
        const data = {
            user
          }
    
        createChat(dispatch, data)
    }
    
    return ( 
        <div className={cx("user-side")}>
            <div className={cx("user-side-header")}>
                <div className={cx("username")}>{currentUser.username}</div>
            </div>
            <div className={cx("search_user")}>
                <input type="text" value={input} className={cx('search_user-input')} onChange={handleInput} />
            </div>
            {userItem 
            
            ?<div className="user_search-list">
                {userItem.map(user => {
                   
                if(user._id !== currentUser._id) 
                return ( 
                        <div className={cx("user-item-tiny")} key={user._id} 
                        // onClick={() => handleAddChatList(user)}
                        >  
                            <img className={cx("user-item-avatar" )} src={user.info.avatarUrl} alt=""/>
                            <div className={cx("user-item-info")}>
                                <div className={cx("user-item-name")}>{user.info.name}</div>
                            </div>
                        </div>
                    )
                })}
               
            </div>
            :
            <div className={cx("user-list")}>
                {chatList.map((user) => {
                    user = user.member[0]._id
                    
                    return (
                        <div key={user._id} className={cx("user-item")} 
                                onClick={() => handleSetCurrentChat(user)}
                                //  PERFORMANCE : rerender lại luôn cả comp cha => fix sau 
                                >
                            <img className={cx("user-item-avatar" )} src={user.info.avatarUrl} alt=""/>
                            <div className={cx("user-item-info")}>
                                <div className={cx("user-item-name")}>{user.info.name}</div>
                                <div className={cx("last-mes")}>M lap fb moi</div>
                            </div>
                        </div>
                    )
                })}
                

            </div>
            }

            

        </div>
     );
}
 
export default UserSide;