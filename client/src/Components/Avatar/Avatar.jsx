import './Avatar.css'

const Avatar = (props) => {
    const { src, classStyles, width } = props
    return (    
        <div className={`avatar-wrapper ${classStyles}`}>
            <img src={src} style={{width: width}} className="avatar" alt="" />
        </div>
    );
}
 
export default Avatar;