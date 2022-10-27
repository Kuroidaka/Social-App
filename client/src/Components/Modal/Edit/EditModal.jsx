import { useState, useRef, useEffect, useContext } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faXmark } from '@fortawesome/free-solid-svg-icons'

import './edit.css'
import { updateUserInfo } from '../../../redux/requestApi'
import Input from '../../InputInfo/Input'
import { UserContext } from '../../../App'

function EditModal(props) {
  const { setEdit } = props
  const { user } = useContext(UserContext)
  const [selectIdx, setSelectIdx] = useState('')
  const picColorRef = useRef()
  const dispatch = useDispatch()
  const [name, setName] = useState(user.info.name)
  const [liveIn, setLiveIn] = useState(user.info.liveIn)
  const [comeFrom, setComeFrom] = useState(user.info.comeFrom)
  const [about, setAbout] = useState(user.info.about)
  const [avaUrl, setAvaUrl] = useState(user.info.avatarUrl)
  const [theme, setTheme] = useState(user.info.theme)

  const avatarUrl = [
    'https://www.pngarts.com/files/11/Avatar-PNG-Pic.png',
    'https://www.pngarts.com/files/11/Avatar-Transparent-Image.png',
    'https://www.pngarts.com/files/11/Avatar-PNG-Photo.png',
    'https://www.pngarts.com/files/11/Avatar-Free-PNG-Image.png',
    'https://www.pngarts.com/files/11/Avatar-PNG-High-Quality-Image.png',
    'https://www.pngarts.com/files/11/Avatar-PNG-Free-Download.png',
    'https://www.pngarts.com/files/3/Cool-Avatar-Transparent-Images.png',
    'https://www.pngarts.com/files/11/Avatar-PNG-Download-Image.png',
  ]

  const handleClickCloseBtn = (e) => {
    e.preventDefault()
    setEdit(false)
  }

  const handleClickPic = (e, index) => {
    // e.target.parentElement.style.backgroundColor = '#6f5353'

    setSelectIdx(index)
    setAvaUrl(e.target.src)
    // console.log(selectIdx, index);
  }

  const handleClickOutside = () => {
    setEdit(false)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    setEdit(false)
    const userUpdated = {
      name: name,
      liveIn: liveIn,
      comeFrom: comeFrom,
      about: about,
      avatarUrl: avaUrl,
      theme: theme,
    }
    
    if(user?.accessToken){
      updateUserInfo(userUpdated, dispatch, user?._id, user?.accessToken)
    }
  }

  useEffect(() => {

  },[])

  return (
    <div >
      <form onSubmit={handleSubmit} >
        <div className='edit-modal-layout' onClick={handleClickOutside}></div>
        <div className="edit-modal">
          <header className="modal-header">
            <p className="modal-title">Edit Profile </p>
                <button className="close_modal" onClick={handleClickCloseBtn}>
                    <FontAwesomeIcon className="close_modal-btn" icon={faXmark}></FontAwesomeIcon>
                </button>
          </header>

          <div className="input-info-wrapper">
            <Input
              name="Name"
              classStyle={'input-info'}
              type="text"
              onChange={(e) => setName(e.target.value)}
              placeholder={user.info.name}
            />

            <Input
              name="Live"
              classStyle={'input-info'}
              type="text"
              onChange={(e) => setLiveIn(e.target.value)}
              placeholder={user.info.liveIn}
            />

            <Input
              name="Come from"
              classStyle={'input-info'}
              type="text"
              onChange={(e) => setComeFrom(e.target.value)}
              placeholder={user.info.comeFrom}
            />

            <Input
              name="About"
              classStyle={'input-info'}
              type="text"
              onChange={(e) => setAbout(e.target.value)}
              placeholder={user.info.about}
              textarea={true}
            />

            <label style={{ display: 'block', marginRight: '20px' }}>
              Profile Picture
            </label>
            <div className="input-profile-avatar-container">
              {avatarUrl.map((url, index) => {
                return (
                  <div
                    ref={picColorRef}
                    className={`profile-picture-selector ${
                      selectIdx === index ? 'active' : ''
                    }`}
                    key={index}
                  >
                    <img
                      className="input-profile-picture"
                      onClick={(e) => handleClickPic(e, index)}
                      src={url}
                      alt="pic"
                    />
                  </div>
                )
              })}
            </div>

            <Input
              name="Background color"
              type="color"
              placeholder={theme}
              onChange={(e) => setTheme(e.target.value)}
            />
          </div>
          <div className="modal_edit-btn-wrapper">
            <button className="save-btn">save</button>
          </div>
        </div>
      </form>
    </div>
  )
}

export default EditModal
