import { lazy, Suspense, useEffect, useState } from "react"
import { useSelector } from "react-redux"
import Load from "../../../Components/Load/Load"
// import Skeleton, { SkeletonTheme } from 'react-loading-skeleton'

// import PubPost from "../../../Components/PubPosts/PubPosts"
const PubPost = lazy(() => import ("../../../Components/PubPosts/PubPosts")) 
// import { ReduxStorePost } from "../../redux/requestApi"


const HomeNewFeed = (props) => {
    const { posts  } = props

    const reduxPosts = useSelector(state => state.post.posts)
    console.log(reduxPosts);
    return (
       <div>
           {reduxPosts &&
            reduxPosts.map((post) => {
                return (
                    post && <Suspense fallback={<Load />}>
                                <PubPost key={post._id} post={post} />
                            </Suspense>
                )
            })
        
            }
            
       </div>
    )
}
 
export default HomeNewFeed;