import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import classNames from "classnames/bind";

import HLoggedIn from "../Components/Header/HLoggedIn";
import styles from '../Components/Header/styles.module.scss'

const cx = classNames.bind(styles)
const HeaderLayout = ({children}) => {
    const currentUser = useSelector(state => state.auth.login?.currentUser )

    return currentUser ?
    <>
        <header className={cx('main-header')}>                                  
            {currentUser && <HLoggedIn />}
        </header>
            {children}
    </>:
    <Navigate to='/login' replace />
     
}
 
export default HeaderLayout;