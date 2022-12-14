import LazyLoad from '../LazyLoad/LazyImg';

const Avatar = (props) => {
    const { src, width, alt, styles } = props

    const image = {
        alt: alt,
        src: src,
        width: width,
        styles: styles
    }

    return <LazyLoad image={image}/>
}
 
export default Avatar;