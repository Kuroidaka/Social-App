import { useSelector } from 'react-redux';
import { BrowserRouter, Routes, Route} from 'react-router-dom'

import { UserContext } from './Context';
import Chat from './features/Chat/pages/Chat';
import Home from './features/Home/pages/Home';
import Profile from './features/Profile/pages/Profile';
import HeaderLayout from './layouts/HeaderLogged/main';
import AuthPage from './features/Login/pages/AuthPage';
// import { Socket } from './services/socket';

function App() {
  const users = useSelector(state => state.user.allUser)

  return (

    <BrowserRouter> 
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
      
    </BrowserRouter>

  );
}

export default App;
