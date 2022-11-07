import { faCircleXmark, faMagnifyingGlass, faSpinner } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useRef, useState, useEffect } from "react";
import { useDebounce } from '../../Hooks'
import axios from 'axios'

import classNames from 'classnames/bind'
import Tippy from '@tippyjs/react/headless'

import styles from './SearchBar.module.scss'
import PopperSearch from "./PopperSearch";
import { useSelector } from "react-redux";


const cx = classNames.bind(styles)

const SearchBar = () => {
    const storage = useSelector(state => state.user.storageSearch)

    const [text, setText] = useState('')
    const [userItem, setUserItem ] = useState([])
    const [userStorage, setUserStorage] = useState(storage)
    const [focus, setFocus] = useState(false)
    const [load, setLoad] = useState(false)
    const inputRef = useRef()
    const deBounce = useDebounce(text, 500)


    useEffect(() => {
        
        if (!deBounce.trim()) return
        setLoad(true)
        const fetchApi = async () => {
            try {
                const result = await axios.get(`/user/search`, {
                    params: {
                        key: deBounce
                    }
                })

                setUserItem(result.data)
                setLoad(false)
            } catch (error) {
                console.log('fetch failure', error);
            }

        }
        fetchApi()
        
    }, [deBounce])

    const handleClickClose = () => {
        setText('')
        inputRef.current.focus()
        setLoad(false)
        setUserItem([])
    }

    // const handleBlur = () => {
    //     setFocus(false)
    // }

    const handleInput = (e) => {
        setText(e.target.value)
        setFocus(true)
        setLoad(false)
    }
   

    return ( 
      <>
            <Tippy
                visible={focus}
                placement="top-start"
                interactive
                render={(attrs) => <PopperSearch 
                                        focus={focus}
                                        setFocus={setFocus}
                                        text ={text}
                                        userItem={userItem} 
                                        setUserStorage={setUserStorage}
                                        userStorage={userStorage} ></PopperSearch>}

                onClickOutside={() => setFocus(false)}
            >
                <div className={cx("search_bar-wrapper")}>

                    <div className={cx("search_bar-icon-box")}>   
                            <FontAwesomeIcon className={cx("search_bar-search-btn")} icon={faMagnifyingGlass}/>
                    </div>

                    <input 
                        placeholder=" "
                        ref={inputRef}
                        value={text}
                        type="text" 
                        className={cx("search_bar-input")}
                        onInput={handleInput}
                        onFocus={() => setFocus(!focus)} 
                        />
        
                     { !load && text && <FontAwesomeIcon className={cx("search_bar-close-btn")} onClick={handleClickClose} icon={faCircleXmark}/>}

                    { load && <FontAwesomeIcon className={cx("load")}icon={faSpinner} />}


                   

                    
                </div>
            </Tippy>
      </>
    );
}
 
export default SearchBar;