// You don't have to convert react-hook style
// because this code is already written by function.
const Input = (props) => {
    return (
        <div className="mb-3">
            <label htmlFor={props.name} className="form-label">
                {props.title}
            </label>
            <input
                type={props.type}
                className={`form-control ${props.className}`}
                id={props.name}
                name={props.name}
                value={props.value}
                onChange={props.handleChange}
                placeholder={props.placeholder}
            />
            
            <div className={props.errorDiv}>{props.errorMsg}</div>
        </div>
    );
};

export default Input;