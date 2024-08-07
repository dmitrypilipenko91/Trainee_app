import Select from 'react-select';
import classes from './MySelect.module.css';

interface Option {
  value: string;
  label: string;
}

interface MySelectProps {
  labelText: string;
  options: Option[];
  onChange: (selectedOption: Option | null) => void;
  value: Option | null;
}

const MySelect: React.FC<MySelectProps> = ({
  labelText,
  options,
  onChange,
  value,
}) => {
  return (
    <div className={classes.selectGroup}>
      <label>{labelText}</label>
      <Select
        options={options}
        className={classes.select}
        onChange={onChange}
        value={value}
      />
    </div>
  );
};

export default MySelect;
