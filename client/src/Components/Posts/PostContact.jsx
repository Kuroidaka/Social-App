import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Fragment, useState } from "react";
import { faComment, faHeart as Heart } from '@fortawesome/free-regular-svg-icons';
import {faHeart as HeartClicked } from '@fortawesome/free-solid-svg-icons';
import classNames from "classnames/bind";

import styles from './Posts.module.scss'
import axios from "axios";
import { useSelector } from "react-redux";

const cx = classNames.bind(styles)

const PostContact = (props) => {
    const {post} = props
    const currentUser = useSelector(state => state.auth?.login?.currentUser)
    const checkLiked = post.userLike.some(userLikeId => userLikeId === currentUser?._id) 
    const [heartClick, setHeartClick] = useState(checkLiked)
    const [likeCount, setLikeCount] = useState(post?.userLike?.length)
    
    console.log();
    const handleHeartClick = async () => {
        heartClick
        ? (setLikeCount(prev => --prev ) )
        : setLikeCount(prev => ++prev ) 
        setHeartClick(!heartClick)
        await axios.post(`/post/like/${post._id}?count=${likeCount}&userId=${currentUser._id}`)
    }

    return( 
          <Fragment>
            <div className={cx("PubPost_footer-icon-block")}>
                <FontAwesomeIcon 
                    className={cx('PubPost_footer-icon')}
                    style={  heartClick && { color: '#ED4956' } }
                    onClick={handleHeartClick} 
                    icon={heartClick? HeartClicked : Heart} />

                <FontAwesomeIcon className={cx("PubPost_footer-icon")} icon={faComment} />
            </div>

            <div className={cx("like-count")}>{likeCount} Likes</div>

            <div className={cx("PubPost_footer-comment-block-wrapper")}>
                    <div className={cx("PubPost_footer-comment-block")}>
                            <input type="text" placeholder='Add comment here...' 
                            className={cx("PubPost_footer-comment-input")} />
                        <button className={cx("PubPost_footer-comment-btn")}>Post</button>
                    </div>
                </div>
          </Fragment>
       )
}
 
export default PostContact;