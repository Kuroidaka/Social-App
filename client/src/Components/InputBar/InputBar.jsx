
import { forwardRef } from 'react';
import './InputBar.css'

const InputBar = (props, ref) => {
    const { placeholder, width, type='text', onChange } = props

    const handleInput = () => {
        ref.current.style.border = '1px solid grey'
    }   

    return ( 
        <div className='input_bar-box'>
            <div  ref={ref} className="input_bar-wrapper" 
                style={{width: width}}>
                <input type={type} autoComplete="new-password" className="input_bar" onInput={ref && handleInput} onChange={onChange} placeholder=' ' />
                <h5 className="input_bar-placeholder">{placeholder}</h5>

            </div>
        </div>
        

    );
}
    
export default forwardRef(InputBar);