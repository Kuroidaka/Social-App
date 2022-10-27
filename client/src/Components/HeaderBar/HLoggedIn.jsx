import { useState } from 'react';
import { useSelector } from 'react-redux';
import Tippy from '@tippyjs/react/headless';

import SearchBar from '../SearchBar/SearchBar';
import './HeaderBar.css'
import Popper from './Popper';
import Interaction from '../Interaction/Interation';

const HLoggedIn = () => {
    const user = useSelector(state => state.auth.login?.currentUser)
    const [popper, setPopper] = useState(false)



    return (
        <div className="header_bar">
            <div className="header-logo ">
                <a href="/" className="header-logo-link" style={{letterSpacing: '3px'}}>Home</a>
            </div>

            <SearchBar />

           <div className='user-wrapper'>
                <div className="interact-box" style={{ marginRight:'10px'}}>
                    <Interaction /> 
                </div>
    
               <Tippy 
                visible = {popper}
                placement="bottom-end"
                interactive
                render={(attrs) =><Popper setPopper={setPopper}/>}
                onClickOutside={() => setPopper(false)}
               >
                    <div className="header_bar-avatar-wrapper">
                        <img 
                            src={user.info?.avatarUrl} 
                            className="header_bar-avatar" alt="" 
                            onClick={() => setPopper(!popper)} />
                    </div>
               </Tippy>
           </div>



        </div>
    );
}
 
export default HLoggedIn;