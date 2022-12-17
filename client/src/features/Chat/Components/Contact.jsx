
import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import userApi from '../../../api/userApi';
import styled from 'styled-components';

import useDebounce from '../../../Hooks/useDebounce';
import { createChat, setCurChat} from '../../../redux/requestApi'
import Avatar from '../../../Components/Avatar/Avatar';

const Contact = (props) => {
    const { userList, changeChat } = props
    const [input, setInput] = useState('')
    const [searchList, setSearchList] = useState([])
    const [selectUser, setSelectUser] = useState(undefined)
    const deBounce = useDebounce(input, 500)
    const currentUser = useSelector(state => state.auth.login.currentUser)

    useEffect(() => {
        setSelectUser(undefined)
        if (!deBounce) setSearchList(deBounce)
        if (!deBounce.trim()) return
        // setLoad(true)

        const params = {
            key: deBounce
        }
        const fetchApi = async () => {
            try {
                await userApi.search(params)
                .then(data => {
                    data = data.filter((user) => {
                        return user._id !== currentUser._id
                    })
                    setSearchList(data)
                })
                
                // setLoad(false)
            } catch (error) {
                console.log('fetch failure', error);
            }

        }
        fetchApi()
        
    }, [deBounce])

    const handleInput = (e) => {
        setInput(e.target.value)

    }

    const handleClickUser = (idx, user) => {
        setSelectUser(idx)
        changeChat(user)
    }

    
    return ( 
        <Container>
            <div className='search'>
                <div className="wrap">
                    <input type="text" value={input} onChange={handleInput} />
                </div>
            </div>
          
            
            <div className="contacts">

            {
                !searchList ?
            <div className='list'>
                {userList && userList.map((user, idx) => { 

                    // const LastMessage = user.lastMes.message.text

                    const conversationId= user._id
                    user = user.member[0]._id
                    const dataCurrentUser = {
                        conversationId,
                        ...user
                    }

                    return (
                        <div 
                        key={user._id} 
                        onClick={() => handleClickUser(idx, dataCurrentUser)}
                        className={`${idx === selectUser && 'select'}`}
                        >
                            <div className={`${user.online? 'online' : ''}`}>
                                <Avatar
                                    src={user.info.avatarUrl}
                                    width='58px'
                                    alt={user.info.name}/>
                                
                            </div>

                            <div>
                                <div className='name'>{user.info.name}</div>
                             { !searchList && <div className='mes'>haha</div>}
                            </div>
                        </div>
                    )})}
            </div>
            :
            <div className="search-list">
            {searchList && searchList.map((user, idx) => { 

                    return (
                        <div 
                        key={user._id} 
                        onClick={() => handleClickUser(idx, user)}
                        className={`${idx === selectUser && 'select'}`}
                        >
                            <Avatar 
                                src={user.info.avatarUrl}
                                width='58px'
                                alt={user.info.name}/>
                            <div>
                                <div className='name'>{user.info.name}</div>
                             { !searchList && <div className='mes'>haha</div>}
                            </div>
                        </div>
                    )})}
            </div>

            }
            </div>
            
            <div className='user'>
                <img 
                src={currentUser.info.avatarUrl} alt={currentUser.info.name}/>
                <div className='username'>{currentUser.username}</div>
            </div>

        </Container>
     );
}
 
export default Contact;

const Container = styled.div`
max-width: 360px;
width: 100%;
height: 100%;
border-right: 1px solid #D7D7D7;
display: grid;
grid-template-rows: 8% 84% 8%;
    .search {
        // margin: 10px 12px;
        height: 6.4vh;
        display: flex;
        align-items: center;
        justify-content: center;

        .wrap {
            width: 90%;
            height: 80%;
            border-radius: 10px;
            background-color: #EFEEEF;
            
            input {
                width: 90%;
                height: 100%;
                border-radius: 10px;
                border: 1px solid black;
                border: none;
                margin: 0 10px;
                background-color: transparent;
                outline: none;
            }
        }
 
    }

    .contacts {
        list-style-type: none;
        height: 67vh;
        width: 100%;
        overflow-y: auto;
        display: block;
        .list, .search-list{
            div{
                display: flex;
                align-self: center;
                padding: 8px 10px;
                transition: .5s ease-in-out;
                cursor: pointer;

                .online{
                        position: relative;

                        &::after{
                            content: '';
                            position: absolute;
                            width: 14px;
                            height: 14px;
                            background-color: #2ee75c;
                            border-radius: 50%;
                            z-index: 99;
                            right: 10px;
                            bottom: 5px;
                            border: 2px solid #FAFAFA;
                        }
                    }

                img{
                    width: 58px;
                    object-fit: contain;
                    border-radius: 50%;
                }

                div{
                    display: block;
                    padding: 0 7px;
                    display: block;
                    display: -webkit-box;
                    overflow: hidden;
                    -webkit-line-clamp: 1;
                    -webkit-box-orient: vertical;

                   

                    .name{
                        font-weight: 600;
                        padding: 0;
                    }
                    .mes{
                        font-weight: 200;
                        opacity: 0.7;
                        color: #8E8D8E;
                        padding: 0;
                    }
                }

                &.select{
                    background-color: #efefef;
                }
            }
        }

    }

    .user {
        height: 6.4vh;
        width: 100%;
        border-top: 1px solid #D7D7D7;
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 0.4rem;

        img {
            width: 40px;
        }

        .username{
            font-weight: 600;
            font-size: 0.9rem;
        }
    }
`