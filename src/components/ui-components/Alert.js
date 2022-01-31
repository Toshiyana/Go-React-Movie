// You don't have to convert react-hook style
// because this code is already written by function.

const Alert = (props) => {
    return (
        <div className={`alert ${props.alertType}`} role="alert">
            {props.alertMessage}
        </div>
    );
}

export default Alert;