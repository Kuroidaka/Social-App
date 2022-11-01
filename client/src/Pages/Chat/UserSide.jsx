import classNames from 'classnames/bind';
import { Link } from 'react-router-dom';

import styles from './Chat.module.scss'
const cx = classNames.bind(styles)

const UserSide = (props) => {
    const { users } = props

    return ( 
        <div className={cx("user-side")}>
            <div className={cx("user-side-header")}>
                <div className={cx("username")}>Kuroidaka</div>
            </div>

            <div className={cx("user-list")}>
            {users.map((user) => {
                return (
                    <Link to={`/${user._id}`} className={cx("user-item")}>
                        <img className={cx("user-item-avatar" )} src={user.info.avatarUrl} alt=""/>
                        <div className={cx("user-item-info")}>
                            <div className={cx("user-item-name")}>{user.info.name}</div>
                            <div className={cx("last-mes")}>M lap fb moi</div>
                        </div>
                    </Link>
                )
            })}
                

            </div>

        </div>
     );
}
 
export default UserSide;