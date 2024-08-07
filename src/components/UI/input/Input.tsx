import classes from './Input.module.css';

interface InputProps {
  type: string;
  min?: number;
  max?: number;
  labelText: string;
  value?: string | number;
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
}

const Input: React.FC<InputProps> = ({
  type,
  labelText,
  value,
  onChange,
  ...props
}) => {
  return (
    <div className={classes.inputGroup}>
      <label>{labelText}</label>
      <input
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
