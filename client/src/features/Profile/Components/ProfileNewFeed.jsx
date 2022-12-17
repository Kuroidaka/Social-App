import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton'

import Post from "../../../Components/Posts/Posts"
// import { ReduxStorePost } from "../../redux/requestApi"


const ProfileNewFeed = (props) => {
    const { user  } = props
    // const [data, setData] = useState([])
    const reduxPosts = useSelector(state => state.post.posts)

    // useEffect(() => {
    //     setData(posts)
    // }, []) 
    // console.log(`${user.info.name}: `, reduxPosts);

    useEffect(() => {

    }, [reduxPosts])

    return (
       <div>
           {
            reduxPosts.map((post) => {
                return (
                    post && <Post key={post._id} post={post} /> 
                )
            })
        
            }
            
       </div>
    )
}
 
export default ProfileNewFeed;