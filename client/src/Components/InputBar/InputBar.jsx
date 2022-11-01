
import './InputBar.css'

const InputBar = (props) => {
    const { placeholder, width, type='text', onChange } = props
    return ( 
        <div className='input_bar-box'>
            <div className="input_bar-wrapper" style={{width: width}}>
                <input type={type} autoComplete="new-password" className="input_bar" onChange={onChange} placeholder=' ' />
                <h5 className="input_bar-placeholder">{placeholder}</h5>

            </div>
        </div>
        

    );
}
    
export default InputBar;