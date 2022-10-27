import classNames from 'classnames/bind'
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import styles from './SearchBar.module.scss'
import { deleteStorage, storageSearchUser } from '../../redux/requestApi'
import { faXmark } from '@fortawesome/free-solid-svg-icons';

const cx = classNames.bind(styles)
const PopperSearch = (props) => {
    const { focus, setFocus, text='', userItem, setUserStorage, userStorage } = props
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const handleClick = (user) => {
        const newUser = {
            name: user.name || user.info.name,
            username: user.username,
            avatarUrl: user.avatarUrl || user.info.avatarUrl,
            id: user._id || user.id
        }
        // console.log(newUser);
        const check = userStorage.some(user => user.username === newUser.username)

        if(!check){
            setUserStorage(prev => [...prev, newUser])
            storageSearchUser(dispatch, newUser, navigate)
        }
       
        navigate(`/Profile/${user?._id || user?.id}`)
        setFocus(false)
    }

    const handleClickDelete = (username) => {
        setUserStorage(userStorage.filter(user => user.username !== username))
        deleteStorage(dispatch, username)

    }
    let newStorage = [...userStorage]

    return ( 
        <div className={cx("popper_search")}>
            {
            
            focus
            &&
            
            text? 
                <div className={cx("user-list")}>
                {userItem.map((user, idx) => {
                    return  <div key={idx} className={cx("user-item")}>
                                <div onClick={() => handleClick(user)} className="link">
                                    <div className={cx("user-info")}>
                                                <img alt='' src={user.info.avatarUrl} className={cx("avatar")} />
                                                <div className={cx("name-box")}>
                                                    <div className={cx("name")}>
                                                    {user.info.name}
                                                    </div>

                                                    <div className={cx("username")}>
                                                    {user.username}
                                                    </div>
                                                </div>
                                    </div>
                                </div>
                                
                            </div>
                        })}
                </div>
            :
            <>
                <div className={cx("header")}>
                    <div className={cx("Popper_title")}>Recent</div>
                    <button className={cx("clear-all")}>Clear all</button>
                </div>

                <div className={cx("user-list")}>
                {newStorage.reverse().map((user, idx) => {
                    return  <div key={idx}  className={cx("user-item")}>
                                <div onClick={() => handleClick(user)}  className="link">
                                    <div className={cx("user-info")}>
                                                <img alt='' src={user.avatarUrl} className={cx("avatar")} />
                                                <div className={cx("name-box")}>
                                                    <div className={cx("name")}>
                                                    {user.name}
                                                    </div>

                                                    <div className={cx("username")}>
                                                    {user.username}
                                                    </div>
                                                </div>
                                    </div>
                                </div>
                                
                                <FontAwesomeIcon onClick={() => handleClickDelete(user.username)} className={cx('delete-btn')} icon={faXmark}/>

                            </div>
                        })}
                </div>
            </>

            
                  
            }

          
              
          

        </div>
     );
}
 
export default PopperSearch;