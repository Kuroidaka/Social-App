
import { faMoon } from "@fortawesome/free-regular-svg-icons";
import { faEarthAsia, faRightFromBracket } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { LogOut } from "../../redux/requestApi";

import Avatar from '../Avatar/Avatar'

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
        <div className="popper">

            {/* item */}

            <Link to={`/Profile/${id}`} className="popper-item" onClick={() => setPopper(false)} >
                <div className="popper-item-icon-wrapper">
                   <Avatar src={user.info.avatarUrl} />
                </div>
                <div className="popper-item-content"><strong>{user.info.name || user.info.username}</strong></div>
            </Link>


            <div className="popper-item">
                <div className="popper-item-icon-wrapper">
                    <FontAwesomeIcon className="popper-item-icon" icon={faEarthAsia}/>
                </div>
                <div className="popper-item-content">Language</div>
            </div>

            <div className="popper-item">
                <div className="popper-item-icon-wrapper">
                    <FontAwesomeIcon className="popper-item-icon" icon={faMoon}/>
                </div>
                {/* <i class="fa-regular fa-moon"></i> */}
                <div className="popper-item-content">Display</div>
            </div>

            <form onSubmit={handleLogOut}>
                <button className="popper-item"  style={{borderTop: '1px solid #f0f0f0'}}>
                    <div className="popper-item-icon-wrapper">
                        <FontAwesomeIcon className="popper-item-icon" icon={faRightFromBracket}/>
                    </div>
                    <div className="popper-item-content">Logout</div>
                </button>

            </form>


        </div>
    );
}
 
export default Popper;