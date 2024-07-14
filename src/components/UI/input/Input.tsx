import classes from './Input.module.css';

interface InputProps {
    type: string;
    min: number;
    max: number;
    labelText: string;
}

const Input: React.FC<InputProps> = ({type, min, max, labelText}) => {
    return (
        <div className={classes.inputGroup}>
            <label>{labelText}</label>
            <input type={type} min={min} max={max} className={classes.input}></input>
        </div>
    )
};

export default Input;