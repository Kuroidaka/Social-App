import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useDispatch, useSelector } from 'react-redux'
import { faImage} from '@fortawesome/free-regular-svg-icons'
import { faXmark } from '@fortawesome/free-solid-svg-icons'
import { useState } from 'react'

import './ModalPost.css'
import PostImg from './PostImg'

import { ReduxAddPost } from '../../../redux/requestApi'
import postApi from '../../../api/postApi'
import fileApi from '../../../api/fileApi'


const ModalPost = (props) => { 
    const { setModalPost } = props
    const [importImg, setImportImg] = useState(false)
    const currentUser  = useSelector(state => state.auth.login.currentUser)
    const userId = currentUser?._id

    const dispatch = useDispatch()
    const [postText, setPostText] = useState('')
    const [imgUrl, setImgUrl] = useState('')


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
        formData.append("file", imgUrl);
        
        const resFile = await fileApi.post(formData)
        
        let newPost = {
            userId: userId,
            postText: postText,
            imgUrl: resFile.data
        }

        await postApi.post(newPost)
        .then((res) => {
            console.log(res);
            ReduxAddPost(dispatch, res)
        })
        .then()
      
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
                                    setPostImg={setImgUrl}
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
                        style={{backgroundImage: `linear-gradient(${currentUser.info.theme} 50%, white 100%)` }}>
                        <p className="modal-submit-btn">Post</p>

                    </button>
                </div>
            </footer>
        </form>
        
        </>
       
        
    );
}
 
export default ModalPost;