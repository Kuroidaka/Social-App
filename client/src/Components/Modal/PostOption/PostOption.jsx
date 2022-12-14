import axios from 'axios'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { ReduxDeletePost } from '../../../redux/requestApi'

// import { deletePost } from '../../../redux/requestApi'
import './PostOption.css'

const PostOption = (props) => {
    const { setModalOption, post } = props
    const user = useSelector(state => state.auth?.login?.currentUser)
    const dispatch = useDispatch()

    const handleDelete = async (e) => {
        e.preventDefault()
           
        await axios.delete(`/post/deletePost/${user._id}/${post._id}/${post.userId._id}`)
            .then(() => {
                // setPosts(prev => prev.filter(target => post._id !== target._id) )
                ReduxDeletePost(dispatch, post._id)
                setModalOption(false)
            })
        
    }

    const handleEdit = (e) => {
        e.preventDefault()
    }

    const handleClose = () => {
        setModalOption(false)
    }

    return ( 
        <div className="post_option">
            <div className="post_option-overlay" onClick={handleClose}></div>
            <div className="post_option-body"> 
    
                <form onSubmit={handleDelete} className="post_option-item">
                    <button className="post_option-item-btn" >
                        <div className="post_option-content" style={{color: '#ED4956'}}>Delete</div>
                    </button>

                </form>

               <form className="post_option-item" onSubmit={handleEdit}>
                    <button className="post_option-item-btn">
                        <div className="post_option-content">Edit</div>
                    </button>

               </form>   

               <form className="post_option-item">
                    <button className="post_option-item-btn" onClick={() => setModalOption(false)}> 
                        <div className="post_option-content">Cancel</div>
                    </button>
               </form>

            </div>

        </div>
    );
}
 
export default PostOption;