import { useSelector } from 'react-redux'
import './post.css'

const   Posts = (props) => {
    const { setModalPost , user } = props

    const currentUser = useSelector(state => state.auth.login?.currentUser)
    let ownUser = true

    if(currentUser?._id !== user?._id) {
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
                            <img className="posts-avatar" src={currentUser.info.avatarUrl} alt="avatar" />
                        </div>

                        <div className="posts-input-content" onClick={handleInputClick}>
                            <p className="posts-input" >{`Hey ${currentUser.info.name}, Wanna post something?`}</p>
                        </div>

                    </div>
                </div>}
        </div>
        
     );
}
 
export default Posts;