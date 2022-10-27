import { faHouse, faLocationDot } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useContext } from 'react';
import { useSelector } from 'react-redux';
import { UserContext } from '../../App';


import './User.css'

const UserAbout = () => {
    const { user } = useContext(UserContext)
    return ( 
        <div className='user-about-box-wrapper'>
            <div className='user-about-box'>
                <div className="user-about">
                    <p className='user-about-title'><b>About</b></p>
                    <div className="user-about-content">{user.info.about}</div>
                </div>
    
                <div className="user-about-info">
                    {/* user live in */}
                    {user.info.liveIn &&
                    <div className="user-about-info-item">
                        <div className="user-about-info-icon-wrapper">
                            <FontAwesomeIcon className="user-about-info-icon" icon={faLocationDot} />
                        </div>
                        <div className="user-about-info-content">Live in <b>{user.info.liveIn}</b></div>
                    </div>}

                    {/* user come from  */}
                  {user.info.comeFrom &&
                    <div className="user-about-info-item">
                        <div className="user-about-info-icon-wrapper">
                            <FontAwesomeIcon className="user-about-info-icon" icon={faHouse} />
                        </div>
                        <div className="user-about-info-content">Come from <b>{user.info.comeFrom}</b></div>
                    </div>}
                </div>

            </div>
        </div>
     );
}
 
export default UserAbout;