import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import classNames from 'classnames/bind';

import styles from './Popper.module.scss'

const cx = classNames.bind(styles)

const NavBarPopper = (props) =>  {
    const {icon, handleClick, content, stylesConfig} = props
   
    return (
    
    <button className={cx("popper-item")} onClick={handleClick} style={stylesConfig}>
        <div className={cx("popper-item-icon-wrapper")}>
            <FontAwesomeIcon className={cx("popper-item-icon")} icon={icon}/>
        </div>
        <div className={cx("popper-item-content")}>{content}</div>
    </button>
)}

 
export default NavBarPopper;