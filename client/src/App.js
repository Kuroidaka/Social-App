import { createContext, useState } from 'react';
import { useSelector } from 'react-redux';
import { BrowserRouter as Router, Routes, Route, Switch } from 'react-router-dom'

// import { createContext } from 'react';

import './App.css';
import HBar from './Components/HeaderBar/HBar';
import HLoggedIn from './Components/HeaderBar/HLoggedIn';
import LoginModal from './Components/Modal/Login/LoginModal';
import RegisterModal from './Components/Modal/Register/RegisterModal';
import Chat from './Pages/Chat/Chat';
import Home from './Pages/Home/Home';
import Profile from './Pages/Profile/Profile';
import LoginPage from './Pages/login/Login'
import MainHeader from './Components/HeaderBar';
import HeaderLayout from './layouts/HeaderLayout';
import AuthPage from './Pages/login/AuthPage';
// import ProfileWrap from './Pages/Profile/ProfileWrap';

export const UserContext = createContext()

function App() {
  const currentUser = useSelector(state => state.auth.login?.currentUser )
  const users = useSelector(state => state.user.allUser)
 
  return (
   <Router> 
    {/* NAV BAR */}
     
      <div className='App'>
          <Routes>  
                <Route path='/login' element={<AuthPage />} />

                <Route path='/' element={<HeaderLayout>
                                            <Home users={users}/>
                                        </HeaderLayout>} />
                <Route path={`/chat`} element={<HeaderLayout>
                                                  <Chat />
                                              </HeaderLayout>} />
            {users.map((user, idx) => {
              const value = {user}
              return(<Route 
                      key={idx}
                      path={`/Profile/${user._id}`} 
                      element={
                              <HeaderLayout>
                                <UserContext.Provider value={value}>
                                    <Profile id={user._id} />
                                </UserContext.Provider>
                              </HeaderLayout>
                              } 
                      />)})}
            {/* {users.map((user) => {
              return (<Route path={`/chat`} element={<Chat/>} />)
            })} */}


          </Routes>
            
      </div>      

   </Router>
  );
}

export default App;
