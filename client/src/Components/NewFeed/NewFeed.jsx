import { useEffect, useState } from "react"
import { useDispatch } from "react-redux"
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton'



import PubPost from "../PubPosts/PubPosts"
import { ReduxStorePost } from "../../redux/requestApi"


const NewFeed = (props) => {
    const { id, posts  } = props
    const [data, setData] = useState([])
    const dispatch = useDispatch()

    useEffect(() => {
        setData(posts)
        ReduxStorePost(dispatch, posts)
    }, []) 

    return (
       <div>
           {data &&
            data.map((post) => {
                return (
                    <PubPost key={post._id} post={post} setPosts={setData}/> 
                )
            })
        
            }
            
       </div>
    )
}
 
export default NewFeed;