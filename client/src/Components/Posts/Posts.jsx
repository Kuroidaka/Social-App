import {  useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'; 
import { Link, useNavigate } from 'react-router-dom'
import { faEllipsis } from '@fortawesome/free-solid-svg-icons';
import classNames from 'classnames/bind';

import { setCurrentProfileUser } from '../../redux/requestApi'
import PostOption from '../Modal/PostOption/PostOption';
import PostContact from './PostContact';
import styles from './Posts.module.scss'
import LazyLoad from '../LazyLoad/LazyImg';

const cx = classNames.bind(styles)

const Post = (props) => {
    const { post } = props
    const [modalOption, setModalOption] = useState(false)
    // const [post, setpost] = useState(post)
    const currentUser = useSelector(state => state.auth.login?.currentUser )
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "June",
    "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

        const date = post.createdAt.split('T')[0].split('-')
        const time = post.createdAt.split('T')[1].split(':')
        const today = new Date()
        var timer
        const postTime = {
            year: Number(date[0]),
            month: Number(date[1]),
            date: Number(date[2]),
            hour: Number(time[0]) + 7,
            min: Number(time[1]),
        }
        const currentTime = {
            year: today.getFullYear(),
            month: today.getMonth()+1,
            date: today.getDate(),
            hour: today.getHours(),
            min: today.getMinutes(),
        }

        if(postTime.year !== currentTime.year){
            timer = `${currentTime.year - postTime.year} year`
            
        } 
        else if(postTime.month !== currentTime.month){
            timer =  `${postTime.date} ${monthNames[postTime.month-1]}`
        } 
        else if(postTime.date !== currentTime.date){
            let tmp = currentTime.date - postTime.date
            tmp > 1 ?  timer = `${currentTime.date - postTime.date} days`
            :timer = `${currentTime.date - postTime.date} day`
        }
        else if(postTime.hour !== currentTime.hour){
            let tmp = currentTime.hour - postTime.hour
            tmp > 1 ?  timer = `${currentTime.hour - postTime.hour} hours`
            :timer = `${currentTime.hour - postTime.hour} hour`
        }
        else if(postTime.min !== currentTime.min){
            let tmp = currentTime.min - postTime.min
            tmp > 1 ?  timer = `${currentTime.min - postTime.min} mins`
            :timer = `${currentTime.min - postTime.min} min`
        }
        else {
            timer = 'Just now'
        }

        
    const handleOptionClick = () => {
        setModalOption(true)
    }

    const handleUserClick = () => {
        // dispatch
        setCurrentProfileUser(dispatch, navigate, post?.userId)
    }
    
    // useEffect(() => {
    //     setpost(post)
        
    //     // return () => {
    //     //     setpost('')
    //     // }
    // }, [post])

    const image = {
        width: '100%',
        height: '506px',
        key: post._id,
        alt: post.imgUrl,
        src: post.imgUrl,
    }

    return ( 

        <div className={cx("PubPost")}>

        { modalOption && <PostOption post={post} setModalOption={setModalOption} />}
            <header className={cx("PubPost_header")}>
                <Link to={`/Profile/${post?.userId._id}`} onClick={handleUserClick} className={cx("PubPost_header-user-info")} >
                    <img className={cx("PubPost_header-avatar")} src={post?.userId?.info?.avatarUrl} alt='avatar'/>
                    <div className={cx("PubPost_header-name-wrapper")}>
                        <p className={cx("PubPost_header-name")}>{post?.userId?.info?.name}</p>
                        <div className={cx("PubPost_header-timer")}>{timer}</div>
                    </div>
                </Link>
                
            {currentUser?._id === post?.userId._id && 
                <FontAwesomeIcon 
                    className={cx('PubPost_header-option-icon' )}
                    icon={faEllipsis} 
                    onClick={handleOptionClick}
                />
            }
            </header>

            {post.postText && 
                <div className={cx("PubPost_footer-des-block")}>
                    <p className={cx("PubPost_footer-des")}>
                        {post.postText}
                    </p>
                </div>
                }
             
             {post.imgUrl && <LazyLoad image={image} />}
             
              {/* <img src={post.imgUrl} alt="" className={cx("PubPost_content-img")} /> */}

            <div className={cx('PubPost_footer')}>
                    <PostContact post={post}/>
            </div>


        </div>
    );
}
 
export default Post;