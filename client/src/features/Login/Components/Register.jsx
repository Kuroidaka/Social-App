import classNames from "classnames/bind"
import { useRef, useState, useEffect } from "react"
import { useDispatch } from "react-redux"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css'

import authApi from "../../../api/authApi"
import Button from "../../../Components/Button/Button"
import InputBar from "../../../Components/InputBar/InputBar"

import styles from '../Login.module.scss'

const cx = classNames.bind(styles)

const toastOptions = {
    position: "top-right",
    autoClose: 5000,
    hideProgressBar: true,
    closeOnClick: true,
    pauseOnHover: false,
    draggable: true,
    progress: undefined,
    theme: "light",
}

const RegisterPage = (props) => {
    const {log, setLog, setLoad, setRegist}= props
    const [name, setName] = useState('')
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const refName = useRef()
    const refUserName = useRef()
    const refPd = useRef()
    
    const handleSubmitRegister = async (e) => {
        e.preventDefault()

        if(!name || !username || !password){
            if(!name) {
                refName.current.style.border = '1.5px solid red'
            }
            if(!username) {
                refUserName.current.style.border = '1.5px solid red'
            }
            if(!password) {
                refPd.current.style.border = '1.5px solid red'
            }
        }
       else {
            setLoad(true)
            const  newUser = {
                name: name,
                username: username,
                password: password
            }
            await authApi.register(newUser)
            .then((data) => {
                setLog('login')
                setRegist(data)
                setLoad(false)
            }) 
            .catch(() => {
                toast.error('Registration error', toastOptions)
                setLoad(false)
            })
       }

    }

    
       
    

    return ( 
        <div>
            <ToastContainer
            position="top-right"
            autoClose={5000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="light"
            />
            <ToastContainer />
            <form className={cx("Register_modal")} onSubmit={handleSubmitRegister}>
                <header className={cx("Register_modal-header")}>
                    <h3 className={cx("Register_modal-title")}>Register</h3>
                </header>
                <div className={cx("Register_modal-body")}>
                    <InputBar
                        ref={refName}
                        placeholder='Name' 
                        width='100%'
                        onChange={(e)=>setName(e.target.value)}
                        />
                    <InputBar 
                        ref={refUserName}
                        placeholder='Username' 
                        width='100%'
                        onChange={(e)=>setUsername(e.target.value)}
                        />
                    <InputBar 
                        ref={refPd}
                        placeholder='Password'
                        width='100%' 
                        onChange={(e)=>setPassword(e.target.value)}
                        type='password'
                        />
                </div>

                <div className={cx("Register_modal-icon-box")}>
                    <Button width={'100%'} btnType={'primary'}>Register</Button>
                </div>

                <div className={cx("register-zone")}>
                  Have already an account?
                  <div className={cx("sign_up-btn")} 
                  onClick={()=> {setLog('login')}}>Login here</div>
                </div>

            </form>
              
        </div>
    );
}
 
export default RegisterPage;