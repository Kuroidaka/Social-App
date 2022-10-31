import axios from "axios"
import { useEffect, useState } from "react"
import classNames from "classnames/bind"
import styles from './NewFeed.module.scss'

import PubPost from "../PubPosts/PubPosts"

const cx = classNames.bind(styles)

const NewFeed = (props) => {
    const { id, home , post } = props
    const [posts, setPosts] = useState([])
    const [pending, setPending] = useState(true)
    const getPosts = async () => {
        setPending(true)
        if(home){
            axios.get('/post/getAll')
            .then((res) => {
                setPosts(res.data)
                setPending(false)
            })
        }
        else {  
            await setPosts(post) 
            setPending(false)
        }
    }
    useEffect(() => {
        getPosts()
    }, []) 

    
    const newPostList = [...posts].reverse()
   
    return (
       <div>
            
               {/* {!pending && <div className={cx("page-loading")}>
                    <div className={cx("lds-ellipsis")}><div></div><div></div><div></div><div></div></div>
                </div> } */}
             

           { newPostList.map((post, idx) => {
                
                return (
                    (id === post.userId || home) && <PubPost key={idx} id={post._id} post={post}/>
                )
                
            })}
       </div>
    )
    
    
}
 
export default NewFeed;