

import { useState, useEffect, Suspense, lazy } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import classNames from 'classnames/bind';

import ModalPost from '../../../Components/Modal/Post/ModalPost';
import EditModal from '../../../Components/Modal/Edit/EditModal'
import Header from '../Components/UserHeader';
import Posts from '../../../Components/CreatePosts/Posts';
// import ProfileNewFeed from '../Components/ProfileNewFeed';

import postApi from '../../../api/postApi'

import styles from '../Profile.module.scss'
import { useParams } from 'react-router-dom';
import { ReduxStorePost } from '../../../redux/requestApi';
import Load from '../../../Components/Load/Load';

const ProfileNewFeed = lazy(() => import ('../Components/ProfileNewFeed'))

const cx = classNames.bind(styles)

const Profile = (props) => {
    const [edit, setEdit] = useState(false)
    // const [load, setLoad] = useState(false)
    const currentUser = useSelector(state => state.auth.login.currentUser)
    const load = useSelector(state => state.load.loading)
    const [user, setUser] = useState()
    const [modalPost, setModalPost] = useState(false)
    const dispatch = useDispatch()
    const users = useSelector(state => state.user.allUser)
    const { id } = useParams()

    // console.log('current user Id: ', currentUser._id);
    // console.log('profile user Id: ', id);

    useEffect(() => {
        postApi.getById(id)
        .then((data) => {
            ReduxStorePost(dispatch, data.reverse())          
        })
        .catch((error) => {
            console.log(error);
        })    

    }, [])

    useEffect(() => {
        const data = users.find(user => user._id === id )
        setUser(data)
    }, [])

    return ( 
        <> 
            
            
            <>
            { edit && <EditModal setEdit={setEdit} /> }
                <Header edit={edit} setEdit={setEdit} user={user}/>

                <div className={cx('grid')}>
                    {modalPost && <ModalPost setModalPost={setModalPost}/>}
                    <Posts setModalPost={setModalPost} user={user}/>
                    <Suspense fallback={<Load />}>
                        <ProfileNewFeed user={user}/>
                    </Suspense>
                    
                </div>

            </>
            
            
            
            {/* {load ?
                <div className={cx("page-loading")}>
                    <div className={cx("lds-ellipsis")}><div></div><div></div><div></div><div></div></div>
                </div>        
            :
            <>
            { edit && <EditModal setEdit={setEdit} /> }
                <Header edit={edit} setEdit={setEdit} user={user}/>

                <div className={cx('grid')}>
                    {modalPost && <ModalPost setModalPost={setModalPost}/>}
                    <Posts setModalPost={setModalPost} user={user}/>
                    <ProfileNewFeed user={user}/>
                </div>

            </>
            }    */}
        
        </>
     
     );
}
 
export default Profile;