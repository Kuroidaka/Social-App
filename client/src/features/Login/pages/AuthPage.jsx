import { useState } from "react";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css'
import styled from 'styled-components'

import LoginPage from "../Components/Login";
import RegisterPage from "../Components/Register";
import Load from "../../../Components/Load/Load";
import image from  "../../../assert/img/background.webp"


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

const AuthPage = () => {

    const [regist, setRegist] = useState(null)
    const [log, setLog] = useState('login')
    const [load, setLoad] = useState(false)
    const [state, setState] = useState(true)

    if(regist){
        toast.success('Registration successfully', toastOptions)
        setRegist(null)
    }

    return ( 
        
        <Container>
              
            {load 
            ?   <Load />
            :(
                log === 'login'
                ? <LoginPage log={log} setLog={setLog} setLoad={setLoad} state={state} setState={setState} />
                : <RegisterPage log={log} setLog={setLog} setLoad={setLoad} setRegist={setRegist}/>
            )
            }
            
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
        </Container>
     );
}
 
export default AuthPage;

const Container = styled.div`
    background-image: url(${image});
    width: 100vw;
    height: 100vh;
    background-repeat: no-repeat;
`