import { lazy, Suspense, useEffect, useState } from "react"
import { useSelector } from "react-redux"
import Load from "../../../Components/Load/Load"
// import Skeleton, { SkeletonTheme } from 'react-loading-skeleton'

// import PubPost from "../../../Components/PubPosts/PubPosts"
const Post = lazy(() => import ("../../../Components/Posts/Posts")) 
// import { ReduxStorePost } from "../../redux/requestApi"


const HomeNewFeed = (props) => {
    const { posts  } = props

    const reduxPosts = useSelector(state => state.post.posts)
    console.log(reduxPosts);
    return (
       <>
           {reduxPosts &&
            reduxPosts.map((post) => {
                return (
                    post && <Suspense key={post._id} fallback={<Load />}>
                                <Post post={post} />
                            </Suspense>
                )
            })
        
            }
            
       </>
    )
}
 
export default HomeNewFeed;