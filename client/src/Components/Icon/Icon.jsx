import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export const CloseBtn = (props) => {
        const { classStyle, onClick } = props
        return (
        <div className="close_btn-wrapper" onClick={onClick}>
            <FontAwesomeIcon className={`close_btn ${classStyle}`}  icon={faXmark} />
        </div>
        )
}