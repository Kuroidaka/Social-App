// import { useState} from 'react';
// import { useDispatch, useSelector } from 'react-redux'
// import { useNavigate } from "react-router-dom";

// import './Login.css'
// import { CloseBtn } from '../../Icon';
// import InputBar from '../../InputBar/InputBar';
// import Button from '../../Button/Button';
// import { login } from '../../../redux/requestApi'
// import { useEffect } from 'react';
// import axios from 'axios';

// const LoginModal = (props) => {
//     const {setLogModal} = props
//     const [username, setUserName] = useState('')
//     const [password, setPassword] = useState('')
//     const [state, setState] = useState(true)
//     const dispatch = useDispatch()
//     const navigate = useNavigate()

//     const handleSubmitLog = async (e) => {
//         e.preventDefault()
//         const newUser  = {
//             username: username,
//             password: password
//         }
//         await axios.post('/authem/login', newUser)
//         .then((res) => {
//             // setLogModal(false)
//             login(res, dispatch, navigate)
//             setState(true)
//         })
//         .then(() => { window.location.reload() })
//         .catch(err => {
//             setState(false)

//         })

//     }

//     return ( 
//         <div>
//             <div className="Login_modal-overlay">

//                 <form className="Login_modal" onSubmit={handleSubmitLog}>
//                     <header className="Login_modal-header">

//                         <h3 className="Login_modal-title">Login</h3>
//                         <CloseBtn 
//                             classStyle={'Login_modal-close_btn'} 
//                             onClick={() => setLogModal(false)}/>
//                     </header>
//                     <div className="Login_modal-body">
//                         <InputBar 
//                             placeholder='Username' 
//                             onChange={(e) => setUserName(e.target.value)} 
//                             width='100%'/>
//                         <InputBar 
//                             placeholder='Password' 
//                             onChange={(e) => setPassword(e.target.value)} 
//                             width='100%' 
//                             type='password'/>
//                     </div>

//                     {!state && <div className="Login_modal-notify">
//                         <p className="Login_modal-notify-content">username or password is not correct</p>
//                     </div>}

//                     <div className="Login_modal-icon-box">
//                         <Button width={'100%'} btnType={'primary'}>Login</Button>
//                     </div>

//                 </form>
//             </div>
            
//         </div>
//     );
// }
 
// export default LoginModal;