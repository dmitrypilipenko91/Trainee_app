import classes from './Input.module.css';

interface InputProps {
  type: string;
  min?: number;
  max?: number;
  labelText: string;
  value?: string | number;
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
  htmlFor?: string;
  id?: string;
}

const Input: React.FC<InputProps> = ({
  type,
  labelText,
  value,
  onChange,
  htmlFor,
  id,
  ...props
}) => {
  return (
    <div className={classes.inputGroup}>
      <label htmlFor={htmlFor}>{labelText}</label>
      <input
        id={id}
        type={type}
        className={classes.input}
        value={value}
        onChange={onChange}
        {...props}
      />
    </div>
  );
};

export default Input;
