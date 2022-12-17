import { useEffect, useState, Suspense, lazy } from "react";
import { useDispatch} from "react-redux";
import classNames from "classnames/bind";
import { useSelector } from 'react-redux';
import { redirect } from "react-router-dom";
// import HomeNewFeed from "../Components/HomeNewFeed";
import UserItem from "../Components/UserItem/UserItem";
import { AllUsers, ReduxStorePost } from "../../../redux/requestApi";
import styles from '../Home.module.scss'
import postApi from "../../../api/postApi";
import CreatePost from "../Components/CreatePosts/CreatePost";
import Load from "../../../Components/Load/Load";
import ModalPost from '../../../Components/Modal/Post/ModalPost'
// import Posts from '../../Components/CreatePosts/Posts'

const HomeNewFeed = lazy(() => import ('../Components/HomeNewFeed') )
const cx = classNames.bind(styles)

const Home = (props) => {
    const users = useSelector(state => state.user.allUser)
    const currentUser = useSelector(state => state.auth.login.currentUser)
    const [modalPost, setModalPost] = useState(false)
    const dispatch = useDispatch()
    const newUserList = [...users].reverse()

    useEffect(() => {
        window.scrollTo(0, 0)
    }, [])

    useEffect(() => {
        AllUsers(dispatch)
    }, [])

    useEffect(() => {   
        postApi.getAll()
        .then((data) => {
            ReduxStorePost(dispatch, data.reverse())
        })
        .catch((error) => {
            console.log(error);
        })
    }, [])

    return (  
        <div className={cx("home")}>
           {modalPost && <ModalPost setModalPost={setModalPost}/>}
            <div className={cx("home-posts")}>
                {/* <Posts ownUser={true}/> */}
                
                <CreatePost setModalPost={setModalPost}/>
                <Suspense fallback={<Load/>}>
                    <HomeNewFeed/>
                </Suspense>
            </div>
            <div className={cx("home-users")}>
                <p className={cx("home-users-title")}>Users</p>
                <div className={cx("home-users-list")}>
                    {newUserList.map((user,idx) => {
                            return <UserItem 
                                        user={user}
                                        key={idx} />})}
                </div>
            </div>
        </div>
    );
}
 
export default Home;