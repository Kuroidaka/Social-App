import classNames from "classnames/bind"
import { useState } from "react";
import LoginPage from "./Login";
import styles from './Login.module.scss'
import RegisterPage from "./Register";

const cx = classNames.bind(styles)

const AuthPage = () => {
    const [log, setLog] = useState(true)
    const [load, setLoad] = useState(false)

    return ( 
        <div className={cx('wrapper')}>

            {load 
            ?<div className={cx("page-loading")}>
                    <div className={cx("lds-ellipsis")}><div></div><div></div><div></div><div></div></div>
            </div> 
            :(log
                ? <LoginPage log={log} setLog={setLog} setLoad={setLoad}/>
                : <RegisterPage log={log} setLog={setLog} setLoad={setLoad}/>
            )
            }
            

            
           
        </div>
     );
}
 
export default AuthPage;