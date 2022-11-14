import { createContext, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom'

import './App.css';

import Chat from './Pages/Chat/Chat';
import Home from './Pages/Home/Home';
import Profile from './Pages/Profile/Profile';
import HeaderLayout from './layouts/HeaderLayout';
import AuthPage from './Pages/login/AuthPage';
import { Socket } from './services/socket';

export const UserContext = createContext()


function App() {
  // const currentUser = useSelector(state => state.auth.login?.currentUser )
  const users = useSelector(state => state.user.allUser)
  const [socket, setSocket] = useState()

  

  return (

    <Router> 
      {/* NAV BAR */}
      
        <div className='App'>
            <Routes>  
                
                  <Route index path='/login' element={<AuthPage/>} />


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
              <Route path={`/chat`} element={<Chat users={users}/>} />

            </Routes>
              
        </div>      
      
    </Router>

  );
}

export default App;
