

import { useContext, useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import classNames from 'classnames/bind';

import EditModal from '../../Components/Modal/Edit/EditModal'
import Header from '../../Components/UserInfo/UserHeader';
import Posts from '../../Components/CreatePosts/Posts';
import ModalPost from '../../Components/Modal/Post/ModalPost';
import NewFeed from '../../Components/NewFeed/NewFeed';
import axios from 'axios';
import { UserContext } from '../../App';
import styles from './Profile.module.scss'

const cx = classNames.bind(styles)

const Profile = (props) => {
    const {id} = props
    const [modalPost, setModalPost] = useState(false)
    const { user } = useContext(UserContext)
    // const currentUser = useSelector(state => state.auth.login?.currentUser)
    const [edit, setEdit] = useState(false)
    const [posts, setPosts] = useState()
    const [check, setCheck] = useState(false)
    const [load, setLoad] = useState(false)
    const currentUser = useSelector(state => state.auth?.login?.currentUser)

    useEffect(() => {
        setLoad(true)
        axios.get(`/post/get/${id}`)
        .then((res) => {
            console.log('get user');
            setPosts(res.data)
            setLoad(false)
        })
        .catch(() => {
            console.log('fetching error');
            setLoad(false)
        }) 
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
                currentUser._id === user._id
                ?<Header edit={edit} setEdit={setEdit} user={currentUser}/>
                :<Header edit={edit} setEdit={setEdit} user={user}/>
            }
            
            { edit && <EditModal check={check} setCheck={setCheck} setEdit={setEdit} setLoad={setLoad} />}

           <div className={cx('grid')}>
                {modalPost && <ModalPost setModalPost={setModalPost}/>}
                { currentUser._id === user._id
                    ?<Posts setModalPost={setModalPost} user={currentUser}/>
                    :<Posts setModalPost={setModalPost} user={user}/>}
                {posts && <NewFeed id={id} home={false} post={posts}/>}
            </div>
        
        </>
     
     );
}
 
export default Profile;