import MyButton from '../components/UI/button/MyButton';
import '../App.css';
import { useNavigate } from 'react-router-dom';

const QuizResults: React.FC = () => {
  const navigate = useNavigate();

  const handleRestartButton = () => {
    navigate('/main');
  };

  const handleAnotherQuizButton = () => {
    navigate('/');
  };

  return (
    <div className="quiz_results_block">
      <h3>Thank you for completing this quiz. Here are your results:</h3>
      <p>You answered 5 out of 5 questions correctly</p>
      <p>Category - . Difficulty - . Type - . Time - </p>
      <p>Total time - </p>
      <MyButton buttonText="Restart" onClick={handleRestartButton} />
      <MyButton
        buttonText="Choose another quiz"
        onClick={handleAnotherQuizButton}
      />
    </div>
  );
};

export default QuizResults;
