

import { useState } from 'react';
import EditModal from '../../Components/Modal/Edit/EditModal'
import './Profile.css';
import Header from '../../Components/UserInfo/UserHeader';
import Posts from '../../Components/CreatePosts/Posts';
import ModalPost from '../../Components/Modal/Post/ModalPost';
import NewFeed from '../../Components/NewFeed/NewFeed';
import { useEffect } from 'react';
import axios from 'axios';

const Profile = (props) => {
    const {id} = props
    const [modalPost, setModalPost] = useState(false)
    const [edit, setEdit] = useState(false)
    const [posts, setPosts] = useState()
    useEffect(() => {
        axios.get(`/post/get/${id}`)
        .then((res) => {
            setPosts(res.data)

        })
        .catch(() => {
            console.log('fetching error');
        }) 
    },[]) 

    return ( 
        <>
            <Header edit={edit} setEdit={setEdit} />
            { edit && <EditModal setEdit={setEdit} />}

           <div className='grid'>
                {modalPost && <ModalPost setModalPost={setModalPost}/>}
                    <Posts setModalPost={setModalPost} />
                {posts && <NewFeed id={id} home={false} post={posts}/>}
            </div>
        
        </>
     
     );
}
 
export default Profile;