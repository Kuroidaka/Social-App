import classNames from "classnames/bind"
import axios from "axios"
import { useState } from "react"
import { useDispatch } from "react-redux"
import { useNavigate } from "react-router-dom"

import Button from "../../Components/Button/Button"
import InputBar from "../../Components/InputBar/InputBar"
import { login } from "../../redux/requestApi"
import styles from './Login.module.scss'

const cx = classNames.bind(styles)

const LoginPage = (props) => {
    const {log, setLog, setLoad}= props
    const [username, setUserName] = useState('')
    const [password, setPassword] = useState('')
    const [state, setState] = useState(true)
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const handleSubmitLog = async (e) => {
        e.preventDefault()
        setLoad(true)
        const newUser  = {
            username: username,
            password: password
        }
        await axios.post('/authem/login', newUser)
        .then((res) => {
            login(res, dispatch, navigate)
            setState(true)
        })
        .then(()=> {
            navigate('/')
            setLoad(false)
        })
        .catch(err => {
            setLoad(false)
            setState(false)
        })

    }

    return ( 
        <div>
            <form className={cx("Login_modal")} onSubmit={handleSubmitLog}>
                <header className={cx("Login_modal-header")}>
                    <h3 className={cx("Login_modal-title")}>Login</h3>
                </header>
                <div className={cx("Login_modal-body")}>
                    <InputBar 
                        placeholder='Username' 
                        onChange={(e) => setUserName(e.target.value)} 
                        width='100%'/>
                    <InputBar 
                        placeholder='Password' 
                        onChange={(e) => setPassword(e.target.value)} 
                        width='100%' 
                        type='password'/>
                </div>

                {!state && <div className={cx("Login_modal-notify")}>
                    <p className={cx("Login_modal-notify-content")}>username or password is not correct</p>
                </div>}

                <div className={cx("Login_modal-icon-box")}>
                    <Button width={'100%'} btnType={'primary'}>Login</Button>
                </div>

                <div className={cx("register-zone")}>
                  Not a member?<div className={cx("sign_up-btn")} 
                    onClick={()=> {setLog(!log)}} >  Sign up now</div>
                </div>
               
            </form>
        </div>
    );
}
 
export default LoginPage;