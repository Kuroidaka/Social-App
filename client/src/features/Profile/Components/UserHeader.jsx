// import { useState } from 'react';
import { faPenToSquare } from '@fortawesome/free-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import { createChat } from '../../../redux/requestApi'
import '../Styles/User.css'
import UserAbout from './UserAbout';



function Header(props) {
    const { edit, setEdit, user } = props
    const currentUser = useSelector(state => state.auth?.login?.currentUser)
    // const [conservation, setConservation] = useState('')
    const dispatch = useDispatch()


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
      
      const data = {
        user,
        currentUser
      }

      createChat(dispatch, data, navigate)
      

      // await axios.post(`/conversation/createChat`, { receiveId: user._id,  senderId: currentUser._id})
      // .then(res => {
      //   const data = res.data[0]?._id

      // })
      
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


      { currentUser?._id === user._id 
      ? <UserAbout user={currentUser}/>
      : <UserAbout user={user}/>}

    </header>
  )
}

export default Header
