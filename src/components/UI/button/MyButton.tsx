import classes from './MyButton.module.css';

interface MyButtonProps {
    buttonText: string;
  }

const MyButton: React.FC<MyButtonProps> = ({buttonText}) => {
    return (
        <button className={classes.myButton}>{buttonText}</button>
    )
};

export default MyButton;