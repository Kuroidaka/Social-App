import { BrowserRouter, Routes, Route} from 'react-router-dom'
import { lazy, Suspense, useContext, useEffect, useRef, useState } from 'react';
import { io } from "socket.io-client";
// import { CONNECTIONPORT } from "./config";

import { SocketContext } from './Context';
import Chat from './features/Chat/pages/Chat';
import E404 from './features/404/Pages/404'
import Home from './features/Home/pages/Home';
// import Profile from './features/Profile/pages/Profile';
import AuthPage from './features/Login/pages/AuthPage';
import HeaderLayout from './layouts/HeaderLogged/HeaderLogged';
import Load from './Components/Load/Load';
import { useSelector } from 'react-redux';

const Profile = lazy(() => import ('./features/Profile/pages/Profile'))


function App() {
  const socket = useRef()
  const currentUser = useSelector(state => state.auth.login.currentUser)



  useEffect(() => {
    if(currentUser){
      socket.current = io('ws://localhost:8000/', {
        auth: {
          currentUser: currentUser
        }
      })
      socket.current.emit('login', currentUser)
    }
  },[currentUser])

  useEffect(() => {
    console.log(socket.current);
      if(socket.current){
        socket.current.emit('online', currentUser)
      }
  
  }, [socket])



  return ( 
    <SocketContext.Provider value={socket}>
      <BrowserRouter> 
          <div className='App'>
              <Routes> 
                <Route index path='/login' element={<AuthPage/>} />
                <Route path='/' element={<HeaderLayout ><Home /></HeaderLayout>} />
                <Route path='/chat' element={<HeaderLayout><Chat /></HeaderLayout>} />
                <Route path='/Profile/:id' element={
                 <Suspense fallback = {<Load />}>
                    <HeaderLayout>
                      <Profile />
                    </HeaderLayout>
                 </Suspense>
                }/>  
                <Route path='*' element={<E404 />} />
              </Routes>
          </div>
      </BrowserRouter>
    </SocketContext.Provider> 
  );
}

export default App;
