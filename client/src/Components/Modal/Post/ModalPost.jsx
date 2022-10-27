import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useDispatch, useSelector } from 'react-redux'
import { faImage} from '@fortawesome/free-regular-svg-icons'
import { faXmark } from '@fortawesome/free-solid-svg-icons'
import { useContext, useState } from 'react'

import './ModalPost.css'
import PostImg from './PostImg'
import { createPost } from '../../../redux/postSlice'
import { Post } from '../../../redux/requestApi'
import { UserContext } from '../../../App'

const ModalPost = (props) => { 
    const { setModalPost} = props
    const [importImg, setImportImg] = useState(false)
    const { user} = useContext(UserContext)
    const userId = user?._id
    const avatarUrl = user?.info.avatarUrl
    const name = user?.info.name
    const dispatch = useDispatch()
    const [postText, setPostText] = useState('')
    const [postImg, setPostImg] = useState('')


    const handleCloseClick = () =>{
        setModalPost(false)
    }

    const handleClickOutside = () => {
        setModalPost(false)
    }

    const handleSubmit = async (e) =>{
        e.preventDefault()
        setModalPost(false)
        // console.log(postImg);
        
        var formData = new FormData();
        formData.append("file", postImg);
        
        const newPost = {
            postText: postText,
            userId: userId,
            name: name,
            avatarUrl: avatarUrl,

        }

        await Post(dispatch, userId, newPost, formData)
        await window.location.reload();
    }

return (  
        <>
       
        <form className='modal-post' name='file' onSubmit={handleSubmit} contenttype='multipart/form-data' >
            {/* header */}
            <div className='modal-post-layout' onClick={handleClickOutside}></div>
            <header className="modal_header-wrapper">
                <div className="modal_header-title">
                    Create Post
                </div>
                <div className="modal_header-close_btn-wrapper" onClick={handleCloseClick}>
                    <FontAwesomeIcon className="modal_header-close_btn" icon={faXmark}></FontAwesomeIcon>
                </div>
            </header>

            {/* content */}

            <div className="modal_content">
                <div className="modal-input-area">
                    <textarea type="text" spellCheck={false} placeholder='What are you thinking?' className="modal_content-input" onChange={(e) => setPostText(e.target.value)} />
                    { importImg &&  <PostImg 
                                    setPostImg={setPostImg}
                                    setImportImg={setImportImg} 
                                  />
                    }
                </div>

                
            </div>

            {/* footer */}
            <footer className='modal-post-footer'>
                <div className="modal_content-icon">
                    <p className='modal-posts-input-title'>Add to your Post: </p>
                    <div className="modal-posts-input-fileImg" onClick={() => {setImportImg(true)}} >
                        <FontAwesomeIcon className='modal-posts-input-fileImg-icon' icon={faImage} />

                        <span className='modal-posts-input-fileImg-name'>Image</span>
                    </div>

                </div>

                <div className="modal-submit">
                    <button className="modal-submit-btn-wrapper" 
                        style={{backgroundImage: `linear-gradient(${user.info.theme} 50%, white 100%)` }}>
                        <p className="modal-submit-btn">Post</p>

                    </button>
                </div>
            </footer>
        </form>
        
        </>
       
        
    );
}
 
export default ModalPost;