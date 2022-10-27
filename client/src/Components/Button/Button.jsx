
import './Button.css'

function Button({children, btnType, id, width, onClick }) {
    
    // const { primary } = props
    // const classStyle = {
    //     primary,
    //     default
    // }
    return ( 

            <button id={id} style={{width: width}} onClick={onClick} className={` Button btn-${btnType}`}>{children}</button>

    );
}
 
export default Button;