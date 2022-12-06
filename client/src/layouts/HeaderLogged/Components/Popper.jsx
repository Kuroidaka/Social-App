
import classNames from 'classnames/bind';
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { faMoon } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEarthAsia, faRightFromBracket } from "@fortawesome/free-solid-svg-icons";

import Avatar from '../../../Components/Avatar/Avatar';
import { LogOut } from "../../../redux/requestApi";
import styles from '../Styles/Popper.module.scss'

const cx = classNames.bind(styles)

const Popper = (props) => {
    const { setPopper } = props
    const user = useSelector(state => state.auth.login.currentUser)
    const accessToken = user?.accessToken
    const id = user?._id
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const handleLogOut = async (e) => {
        e.preventDefault()
        LogOut(dispatch, id, accessToken, navigate)
    }

    return ( 
        <div className={cx("popper")}>
            <Link to={`/Profile/${id}`} className={cx("popper-item")} onClick={() => setPopper(false)} >
                <div className={cx("popper-item-icon-wrapper")}>
                   <Avatar src={user.info.avatarUrl} width='35px'/>
                </div>
                <div className={cx("popper-item-content")}><strong>{user.info.name || user.info.username}</strong></div>
            </Link>

            <div className={cx("popper-item")}>
                <div className={cx("popper-item-icon-wrapper")}>
                    <FontAwesomeIcon className={cx("popper-item-icon")} icon={faEarthAsia}/>
                </div>
                <div className={cx("popper-item-content")}>Language</div>
            </div>

            <div className={cx("popper-item")}>
                <div className={cx("popper-item-icon-wrapper")}>
                    <FontAwesomeIcon className={cx("popper-item-icon")} icon={faMoon}/>
                </div>
                <div className={cx("popper-item-content")}>Display</div>
            </div>

            <form onSubmit={handleLogOut}>
                <button className={cx("popper-item")}  style={{borderTop: '1px solid #f0f0f0'}}>
                    <div className={cx("popper-item-icon-wrapper")}>
                        <FontAwesomeIcon className={cx("popper-item-icon")} icon={faRightFromBracket}/>
                    </div>
                    <div className={cx("popper-item-content")}>Logout</div>
                </button>
            </form>
        </div>
    );
}
 
export default Popper;