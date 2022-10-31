// import { useDispatch } from 'react-redux';

// import { register } from '../../../redux/requestApi';
// import InputBar from '../../InputBar/InputBar';
// import './Register.css'
// import { CloseBtn } from '../../Icon';
// import Button from '../../Button/Button';
// import { useState } from 'react';

// const RegisterModal = (props) => {
//     const {setRegisterModal, setLogModal} = props 
//     const [name, setName] = useState('')
//     const [username, setUsername] = useState('')
//     const [password, setPassword] = useState('')
//     const dispatch = useDispatch()

//     const handleSubmitRegister = async (e) => {
//         e.preventDefault()
        
//         const  newUser = {
//             name: name,
//             username: username,
//             password: password
//         }
//         register(newUser, dispatch)
//         setRegisterModal(false)
//         setLogModal(true)

//     }

//     return ( 
//         <div>
//             <div className="Register_modal-overlay">

//                 <form className="Register_modal" onSubmit={handleSubmitRegister}>
//                     <header className="Register_modal-header">

//                         <h3 className="Register_modal-title">Register</h3>
//                         <CloseBtn 
//                             classStyle={'Register_modal-close_btn'} 
//                             onClick={() => setRegisterModal(false)}/>

//                     </header>
//                     <div className="Register_modal-body">
//                         <InputBar 
//                             placeholder='Name' 
//                             width='100%'
//                             onChange={(e)=>setName(e.target.value)}/>
//                         <InputBar 
//                             placeholder='Username' 
//                             width='100%'
//                             onChange={(e)=>setUsername(e.target.value)}/>
//                         <InputBar 
//                             placeholder='Password'
//                             width='100%' 
//                             onChange={(e)=>setPassword(e.target.value)}
//                             type='password'
//                             />
//                     </div>

//                     <div className="Register_modal-icon-box">
//                         <Button width={'100%'} btnType={'primary'}>Register</Button>
//                     </div>

//                 </form>
//             </div>
            

               

           
//         </div>
//     );
// }
 
// export default RegisterModal;