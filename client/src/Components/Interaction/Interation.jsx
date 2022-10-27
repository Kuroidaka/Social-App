import classNames from "classnames/bind";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import styles from './Interaction.module.scss'
import { faComment } from "@fortawesome/free-regular-svg-icons";
import { Link } from "react-router-dom";

const cx = classNames.bind(styles)

const Interaction = () => {
    return ( 
        <>
            <Link to={'/chat'} className={cx("message-wrapper")}>
                <FontAwesomeIcon className={cx("message")} icon={faComment}/>
            </Link>  
            <div className={cx("notify-wrapper")}></div>
        </>
     );
}
 
export default Interaction;