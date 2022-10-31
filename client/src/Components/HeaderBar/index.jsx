import { useSelector } from "react-redux";
// import HBar from "./HBar";
import HLoggedIn from "./HLoggedIn";

const MainHeader = (props) => {
    // const {setRegisterModal, setLogModal} = props
    const currentUser = useSelector(state => state.auth.login?.currentUser )
    return ( 
        <header className='main-header'>                                  
        {currentUser && <HLoggedIn />}

        {/* :<HBar setRegisterModal={setRegisterModal} setLogModal={setLogModal}/> */}

     </header>
     );
}
 
export default MainHeader;