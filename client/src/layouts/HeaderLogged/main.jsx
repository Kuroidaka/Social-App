import { useSelector } from "react-redux";
import classNames from "classnames/bind";

import HLoggedIn from "./Components/HLoggedIn";
import styles from './HeaderLogged.module.scss'

const cx = classNames.bind(styles)
const HeaderLayout = ({children}) => {
    const currentUser = useSelector(state => state.auth.login?.currentUser )

    return<>
            <header className={cx('main-header')}>                                  
                {currentUser ? <HLoggedIn /> : ''}
            </header>
            {children}
        </>
     
}
 
export default HeaderLayout;