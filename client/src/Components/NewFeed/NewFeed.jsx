import axios from "axios"
import { useEffect, useState } from "react"

import PubPost from "../PubPosts/PubPosts"

const NewFeed = (props) => {
    const { id, home , post } = props
    const [posts, setPosts] = useState([])
    // const [pending, setPending] = useState(true)
    const getPosts = async () => {
        // setPending(true)
        if(home){
            axios.get('/post/getAll')
            .then((res) => {
                setPosts(res.data)
                // setPending(false)
            })
        }
        else {  
            await setPosts(post) 
            // setPending(false)
        }
    }
    useEffect(() => {
        console.log('get post ');
        getPosts()
    }, []) 
    const newPostList = [...posts].reverse()
   
    return (
       <div>
           { newPostList.map((post, idx) => {
                return (
                    (id === post.userId || home) && <PubPost key={idx} id={post._id} post={post}/>
                )
            })}
       </div>
    )
}
 
export default NewFeed;