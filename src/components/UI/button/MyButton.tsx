import classes from './MyButton.module.css';
import { motion } from 'framer-motion';

interface MyButtonProps {
  buttonText: string;
  onClick: () => void;
}

const MyButton: React.FC<MyButtonProps> = ({ buttonText, onClick }) => {
  return (
    <motion.button
      whileHover={{
        scale: 1.05,
        backgroundColor: 'rgb(105, 105, 105)',
        color: 'rgb(255, 255, 255)',
      }}
      className={classes.myButton}
      onClick={onClick}
    >
      {buttonText}
    </motion.button>
  );
};

export default MyButton;
