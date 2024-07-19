import classes from './MyButton.module.css';

interface MyButtonProps {
  buttonText: string;
  onClick: () => void;
}

const MyButton: React.FC<MyButtonProps> = ({ buttonText, onClick }) => {
  return (
    <button className={classes.myButton} onClick={onClick}>
      {buttonText}
    </button>
  );
};

export default MyButton;
