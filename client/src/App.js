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
// import ProfileWrap from './Pages/Profile/ProfileWrap';

export const UserContext = createContext()

function App() {
  const currentUser = useSelector(state => state.auth.login?.currentUser )
  // const getUser = useSelector(state => state.auth.user?.getUser)
  const [logModal, setLogModal] = useState(false)
  const [registerModal, setRegisterModal] = useState(false)
  
  const users = useSelector(state => state.user.allUser)
 
  return (
   <Router> 

    {/* NAV BAR */}
      {logModal && !registerModal && <LoginModal 
                                        setLogModal={setLogModal} 
                                        setRegisterModal={setRegisterModal} />}
      {registerModal && !logModal && <RegisterModal 
                                        setRegisterModal={setRegisterModal}
                                        setLogModal={setLogModal} />}
     <header className='main-header'>                                  
        {currentUser? <HLoggedIn />:<HBar 
                                  setRegisterModal={setRegisterModal} 
                                  setLogModal={setLogModal}/>}

     </header>

      <div className='App'>


          <Routes>
            <Route path='/' element={<Home users={users}/>} />
            <Route path={`/chat`} element={<Chat />} />
            {users.map((user, idx) => {
              const value = {user}
              return(<Route 
                      key={idx}
                      path={`/Profile/${user._id}`} 
                      element={
                              <UserContext.Provider value={value}>
                                  <Profile id={user._id} />
                              </UserContext.Provider>
                              } 
                      />)})}
            {/* {users.map((user) => {
              return (<Route path={`/chat`} element={<Chat users={users} user={user}/>} />)
            })} */}


          </Routes>
            
      </div>      

   </Router>
  );
}

export default App;
