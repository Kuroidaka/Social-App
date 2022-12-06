import classNames from 'classnames/bind';

import styles from './Avatar.module.scss'

const cx = classNames.bind(styles)

const Avatar = (props) => {
    const { src, classStyles, width, alt } = props

    const className = cx('avatar', {
        [classStyles] : classStyles
    })

    return (    
            <img src={src} style={{width: width}} className={className} alt={alt} />
    );
}
 
export default Avatar;