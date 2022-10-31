

import { useContext, useState, useEffect } from 'react';
import EditModal from '../../Components/Modal/Edit/EditModal'
import './Profile.css';
import Header from '../../Components/UserInfo/UserHeader';
import Posts from '../../Components/CreatePosts/Posts';
import ModalPost from '../../Components/Modal/Post/ModalPost';
import NewFeed from '../../Components/NewFeed/NewFeed';
import axios from 'axios';
import { UserContext } from '../../App';
import { useSelector } from 'react-redux';

const Profile = (props) => {
    const {id} = props
    const [modalPost, setModalPost] = useState(false)
    const { user } = useContext(UserContext)
    // const currentUser = useSelector(state => state.auth.login?.currentUser)
    const [edit, setEdit] = useState(false)
    const [posts, setPosts] = useState()
    const [check, setCheck] = useState(false)
    

    useEffect(() => {
        axios.get(`/post/get/${id}`)
        .then((res) => {
            setPosts(res.data)

        })
        .catch(() => {
            console.log('fetching error');
        }) 
    }, [check]) 

    


    return ( 
        <>
            <Header edit={edit} setEdit={setEdit} />
            { edit && <EditModal check={check} setCheck={setCheck} setEdit={setEdit} />}

           <div className='grid'>
                {modalPost && <ModalPost setModalPost={setModalPost}/>}
                    <Posts setModalPost={setModalPost} user={user}/>
                {posts && <NewFeed id={id} home={false} post={posts}/>}
            </div>
        
        </>
     
     );
}
 
export default Profile;