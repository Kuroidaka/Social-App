import './InputInfo.css'

function Input(props) {
    const { name, onChange, placeholder, classStyle, type, textarea } = props
    const In = textarea? 'textarea': 'input'
    return ( 
        <div className='input-wrapper'>
            <label style={{display:'block', marginRight: '20px'}}>{name}</label>
            <In
              className={classStyle}
              type={type}
              onChange={onChange}
              placeholder={placeholder}
            />
        </div>
     );
}

export default Input;