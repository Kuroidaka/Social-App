import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFileCirclePlus, faXmark } from '@fortawesome/free-solid-svg-icons'
import { useState } from "react";

const PostImg = (props) => {
    const { setImportImg, setPostImg } = props
    const [imgUploaded, setImgUploaded] = useState()

    const handleClickCloseBtn = (e) => {
        // await e.stopPropagation()

        // set state img upload btn 
        setImportImg(false)
    }

  
    const handlePostImg = async (e) => {
        const file = e.target.files[0]
        file.preview = URL.createObjectURL(file)

        // set state for image preview
        setImgUploaded(file)
        // console.log(file.preview);
        await setPostImg(file)

    }

    // useEffect(() => {
    //     return () => {
    //         imgUploaded && URL.revokeObjectURL(imgUploaded.preview)
    //     }
    // },[imgUploaded]) 

    return ( 
        <>
            {imgUploaded ?
            <div className="img-preview-update-wrapper">
                <img src={imgUploaded.preview}  className="img-preview-update" alt='img' width={'80%'}/>

            </div> 
            :
            <label htmlFor={'input-file'} className="postImg" onInput={handlePostImg}>
                <input 
                    id="input-file"
                    type="file" 
                    style={{display: 'none'}} 
                   />
                <div className="close_btn-wrapper" onClick={handleClickCloseBtn}>
                    <FontAwesomeIcon className="postImg-close_btn" icon={faXmark}/>
                </div>
                <FontAwesomeIcon className="postImg-icon" icon={faFileCirclePlus}/>
                <p className="postImg-text">Add Image or Video</p>
            </label>
            }
        </>
        
     );
}
 
export default PostImg;