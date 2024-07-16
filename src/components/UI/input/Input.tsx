import classes from './Input.module.css';

interface InputProps {
    type: string;
    min: number;
    max: number;
    labelText: string;
}

const Input: React.FC<InputProps> = ({type, labelText, ...props}) => {
    return (
        <div className={classes.inputGroup}>
            <label>{labelText}</label>
            <input type={type} className={classes.input} {...props} />
        </div>
    )
};

export default Input;