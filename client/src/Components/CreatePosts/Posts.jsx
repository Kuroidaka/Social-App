import { useSelector } from 'react-redux'
import './post.css'
import { useContext } from 'react'
import { UserContext } from '../../App'

const Posts = (props) => {
    const { setModalPost } = props
    const { user } = useContext(UserContext)
    const currentUser = useSelector(state => state.auth.login?.currentUser)
    let ownUser = true

    if(currentUser?._id !== user._id) {
        ownUser = false
    }
    const handleInputClick = () => {
        setModalPost(true)
    }
    
    return ( 

        <div className="posts-content">
            {ownUser &&                
                <div className="posts-input-wrapper">
                    <div className="posts-input-header">
                        
                        <div className="po sts-avatar-wrapper">
                            <img className="posts-avatar" src={user.info.avatarUrl} alt="avatar" />
                        </div>

                        <div className="posts-input-content" onClick={handleInputClick}>
                            <p className="posts-input" >{`Hey ${user.info.name}, Wanna post something?`}</p>
                        </div>

                    </div>
                </div>}
        </div>
        
     );
}
 
export default Posts;