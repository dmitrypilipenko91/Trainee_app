import Select from 'react-select';
import classes from './MySelect.module.css';

interface Option {
  value: string;
  label: string;
}

interface MySelectProps {
  labelText: string;
  options: Option[];
}

const MySelect: React.FC<MySelectProps> = ({ labelText, options }) => {
  return (
    <div className={classes.selectGroup}>
      <label>{labelText}</label>
      <Select options={options} className={classes.select} />
    </div>
  );
};

export default MySelect;
