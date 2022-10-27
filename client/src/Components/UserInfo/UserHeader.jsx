// import { useState } from 'react';
import { faPenToSquare } from '@fortawesome/free-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import axios from 'axios';
import { useContext } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../../App';

import './User.css'
import UserAbout from './UserAbout';



function Header(props) {
    const { edit, setEdit } = props
    const { user } = useContext(UserContext)
    const currentUser = useSelector(state => state.auth?.login?.currentUser)
    const navigate = useNavigate()
    let ownUser = true
    if(currentUser?._id !== user._id) {
      ownUser = false
    }
    const handleClickEdit = () => {
          setEdit(!edit)
    }

    const handleMes = async (e) => {
      e.preventDefault()
      const res = await axios.post(`/chat/${user._id}?id=${currentUser._id}`)
      console.log(res);
      // await navigate(`/chat/`)
    }

  return (
    <header>
      
      <div className="header-wrapper" style={{ backgroundImage: `linear-gradient(${user.info.theme} 20%, white 100%)` }}>
      

        <div className="user">
            <div className="img-wrapper">
                <img
                    className="user_avatar"
                    src={user.info.avatarUrl}
                    alt="avatar"
                />
            </div>
        </div>

      </div>

      <div className="user-control">
          <div className="user-info">
            <div className="name">{user.info.name}</div>
            
          {ownUser ? 
            <button className="edit-btn" onClick={handleClickEdit}>
              <FontAwesomeIcon className='edit-btn-icon' icon={faPenToSquare}/>
              Edit Profile
            </button>
            :
            <form  onSubmit={handleMes}>
              <button className="text-thisOne">
                <p style={{color: 'white'}}>Send message</p>
              </button>
            </form>
            }

          </div>
            
      </div>


      {(user.info.about || user.info.liveIn || user.info.comeFrom )&& <UserAbout />}

    </header>
  )
}

export default Header
