import { useSelector } from 'react-redux'
import classNames from 'classnames/bind'

import styles from './CreatePost.module.scss'
import { Link } from 'react-router-dom'

const cx = classNames.bind(styles)

const CreatePost = (props) => {
    const { setModalPost } = props

    const currentUser = useSelector(state => state.auth.login?.currentUser)

    const handleInputClick = () => {
        setModalPost(true)
    }
    
    return ( 

        <div className={cx("posts-content")}>
                <div className={cx("posts-input-wrapper")}>
                    <div className={cx("posts-input-header")}>
                        
                        <Link to={`/Profile/${currentUser._id}`} className={cx("posts-avatar-wrapper")}>
                            <img className={cx("posts-avatar")} src={currentUser?.info?.avatarUrl} alt="avatar" />
                        </Link>

                        <div className={cx("posts-input-content")} onClick={handleInputClick}>
                            <p className={cx("posts-input")} >{`Hey ${currentUser?.info?.name}, What are you thinking?`}</p>
                        </div>

                    </div>
                </div>
        </div>
        
     );
}
 
export default CreatePost;