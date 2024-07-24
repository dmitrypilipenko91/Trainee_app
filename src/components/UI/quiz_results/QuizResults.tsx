import classes from './QuizResults.module.css';
import MyButton from '../button/MyButton';

const handleButtonClick = () => {
  console.log('Button clicked!');
};

const QuizResults: React.FC = () => {
  return (
    <div className={classes.quiz_results_block}>
      <h3>Thank you for completing this quiz. Here are your results:</h3>
      <p>You answered 5 out of 5 questions correctly</p>
      <p>Category - . Difficulty - . Type - . Time - </p>
      <p>Total time - </p>
      <MyButton buttonText="Restart" onClick={handleButtonClick} />
      <MyButton buttonText="Choose another quiz" onClick={handleButtonClick} />
    </div>
  );
};

export default QuizResults;
