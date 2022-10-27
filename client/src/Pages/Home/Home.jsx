import { useEffect } from "react";
import { useDispatch} from "react-redux";
import NewFeed from "../../Components/NewFeed/NewFeed";
import UserItem from "../../Components/UserItem/UserItem";
import { AllUsers } from "../../redux/requestApi";
import './Home.css'

const Home = (props) => {
    const { users  } = props
    const dispatch = useDispatch()
    const newUserList = [...users].reverse()
    useEffect(() => {
        AllUsers(dispatch)

    }, [])

    return (  
        <div className="home">

            
            <div className="home-posts">
                <NewFeed home/>
            </div>

            <div className="home-users">
                <p className="home-users-title">Users</p>
                <div className="home-users-list">

                    {
                        newUserList.map((user,idx) => {
                            return <UserItem 
                                        user={user}
                                        key={idx}
                                        name={user.info.name} 
                                        avatarUrl={user.info.avatarUrl}
                                    />
                        })

                    }
                                       

                </div>
            </div>
            
        </div>
    );
}
 
export default Home;