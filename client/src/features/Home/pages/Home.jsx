import { useEffect } from "react";
import { useDispatch} from "react-redux";
import classNames from "classnames/bind";
import { useSelector } from 'react-redux';

import NewFeed from "../../../Components/NewFeed/NewFeed";
import UserItem from "../Components/UserItem/UserItem";
import { AllUsers } from "../../../redux/requestApi";
import styles from '../Home.module.scss'
import postApi from "../../../api/postApi";
import { useState } from "react";
// import Posts from '../../Components/CreatePosts/Posts'

const cx = classNames.bind(styles)

const Home = (props) => {
    const users = useSelector(state => state.user.allUser)
    const [posts, setPosts] = useState([])
    const dispatch = useDispatch()
    const newUserList = [...users].reverse()
    useEffect(() => {
        AllUsers(dispatch)
    }, [])

    useEffect(() => {   
        postApi.getAll()
        .then((data) => {
            setPosts(data.reverse())
        })
        .catch((error) => {
            console.log(error);
        })
    }, [])

    return (  
        <div className={cx("home")}>
            <div className={cx("home-posts")}>
                {/* <Posts ownUser={true}/> */}
              {posts.length >= 1 && <NewFeed posts={posts}/>}
            </div>

            <div className={cx("home-users")}>
                <p className={cx("home-users-title")}>Users</p>
                <div className={cx("home-users-list")}>
                    {
                        newUserList.map((user,idx) => {
                            return <UserItem 
                                        user={user}
                                        key={idx} 
                                    />
                        })

                    }
                </div>
            </div>

        </div>
    );
}
 
export default Home;