
import classNames from 'classnames/bind';
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { faMoon } from "@fortawesome/free-regular-svg-icons";
import { faEarthAsia, faRightFromBracket } from "@fortawesome/free-solid-svg-icons";

import authApi from '../../../api/authApi'
import Avatar from '../../../Components/Avatar/Avatar';
import { LogOut } from "../../../redux/requestApi";
import NavBarPopper from './NavBarPopper'
import styles from './Popper.module.scss'
import { useContext } from 'react';
import { SocketContext } from '../../../Context';

const cx = classNames.bind(styles)

const Popper = (props) => {
    const { setPopper } = props
    const socket = useContext(SocketContext)
    const currentUser = useSelector(state => state.auth.login.currentUser)
    const id = currentUser?._id
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const handleLogOut = async (e) => {
        e.preventDefault()
        if(socket.current){
            socket.current.emit('logout', currentUser)
            // await authApi.logout(currentUser)
            // .then(() => {
                LogOut(dispatch, navigate)
                socket.current.emit('logout')
            // })
        }
       
        
    }

    return ( 
        <div className={cx("popper")}>


            <Link to={`/Profile/${id}`} className={cx("popper-item")} onClick={() => setPopper(false)} >
                <div className={cx("popper-item-icon-wrapper")}>
                <Avatar src={currentUser.info.avatarUrl} width='35px'/>
                </div>
                <div className={cx("popper-item-content")}><strong>{currentUser.info.name || currentUser.info.username}</strong></div>
            </Link>

            <NavBarPopper 
                icon={faEarthAsia}
                content = 'Language'
            />
            <NavBarPopper 
                icon={faMoon}
                content = 'Display'
            />
            <NavBarPopper 
                icon={faRightFromBracket}
                content = 'Logout'
                handleClick={handleLogOut}
                stylesConfig= {{borderTop: '1px solid #f0f0f0'}}
            />

        </div>
    );
}
 
export default Popper;