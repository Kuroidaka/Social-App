

import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import classNames from 'classnames/bind';

import ModalPost from '../../../Components/Modal/Post/ModalPost';
import EditModal from '../../../Components/Modal/Edit/EditModal'
import Header from '../Components/UserHeader';
import Posts from '../../../Components/CreatePosts/Posts';
import NewFeed from '../../../Components/NewFeed/NewFeed';
import userApi from '../../../api/userApi'
import postApi from '../../../api/postApi'

import styles from '../Profile.module.scss'
import { useParams } from 'react-router-dom';

const cx = classNames.bind(styles)

const Profile = (props) => {
    const [edit, setEdit] = useState(false)
    const [load, setLoad] = useState(false)
    // const [posts, setPosts] = useState()
    const [check, setCheck] = useState(false)
    const [user, setUser] = useState()
    const [posts, setPosts] = useState([])
    const [modalPost, setModalPost] = useState(false)
    const users = useSelector(state => state.user.allUser)
    const currentUser = useSelector(state => state.auth?.login?.currentUser)
    const { id } = useParams()

    const getUser = (id) => {
       const data = users.find(user => user._id === id)
       setUser(data)
    }

    useEffect(() => {
        postApi.getById(id)
        .then((data) => {
            setPosts(data.reverse())
        })
        .catch((error) => {
            console.log(error);
        })    

    }, []) 

    useEffect(() => {
        getUser(id)
    }, [check]) 


    return ( 
        <> 
            {
                load && 
                <div className={cx("page-loading")}>
                    <div className={cx("lds-ellipsis")}><div></div><div></div><div></div><div></div></div>
                </div> 
            }
            {
                currentUser._id === user?._id
                ?<Header edit={edit} setEdit={setEdit} user={currentUser}/>
                :<Header edit={edit} setEdit={setEdit} user={user}/>
            }
            
            { edit && <EditModal check={check} setCheck={setCheck} setEdit={setEdit} setLoad={setLoad} />}

           <div className={cx('grid')}>
                {modalPost && <ModalPost setModalPost={setModalPost}/>}
                { currentUser._id === user?._id
                    ?<Posts setModalPost={setModalPost} user={currentUser}/>
                    :<Posts setModalPost={setModalPost} user={user}/>}
              {posts.length >= 1 && <NewFeed id={id} posts={posts} />}
            </div>
        
        </>
     
     );
}
 
export default Profile;