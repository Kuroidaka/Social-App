import { BrowserRouter, Routes, Route} from 'react-router-dom'

import Chat from './features/Chat/pages/Chat';
import E404 from './features/404/Pages/404'
import Home from './features/Home/pages/Home';
import Profile from './features/Profile/pages/Profile';
import AuthPage from './features/Login/pages/AuthPage';
import HeaderLayout from './layouts/HeaderLogged/main';
// import { Socket } from './services/socket';

function App() {

  return (

    <BrowserRouter> 
      {/* NAV BAR */}
      
        <div className='App'>
            <Routes> 
              <Route index path='/login' element={<AuthPage/>} />
              <Route path='/' element={<HeaderLayout><Home /></HeaderLayout>} />
              <Route path='/chat' element={<HeaderLayout><Chat /></HeaderLayout>} />
              <Route path='/Profile/:id' element={<HeaderLayout><Profile /></HeaderLayout>} />  
              <Route path='*' element={<E404 />} />
            </Routes>
              
        </div>      
      
    </BrowserRouter>

  );
}

export default App;
