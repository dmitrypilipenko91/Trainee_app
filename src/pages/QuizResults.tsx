import MyButton from '../components/UI/button/MyButton';
import '../App.css';
import { useNavigate } from 'react-router-dom';
import { paths } from '../utils/paths';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { clearQuizState, setStartTime } from '../slices/quizSettingsSlice';
import { clearResults } from '../slices/quizResultsSlice';
import { clearSelectedValues } from '../slices/selectedValuesSlice';
import { motion } from 'framer-motion';

const QuizResults: React.FC = () => {
  const navigate = useNavigate();

  const dispatch = useAppDispatch();

  const handleRestartButton = () => {
    dispatch(clearResults());
    dispatch(setStartTime(Date.now()));
    navigate(paths.main);
  };

  const handleAnotherQuizButton = () => {
    dispatch(clearQuizState());
    dispatch(clearResults());
    dispatch(clearSelectedValues());
    navigate(paths.home);
  };

  const { questions, configuration, startTime, endTime } = useAppSelector(
    (state) => state.quizSettings,
  );

  const correctAnswersCount = useAppSelector(
    (state) => state.quizResults.correctAnswers,
  );

  const category = useAppSelector(
    (state) => state.selectedValues.selectedCategory?.label,
  );

  const timeTaken =
    startTime && endTime ? Math.floor((endTime - startTime) / 1000) : 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: -100 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1 }}
    >
      <div className="quiz_results_block">
        <h3>Thank you for completing this quiz. Here are your results:</h3>
        <p>
          You answered {correctAnswersCount} out of {questions.length} questions
          correctly
        </p>
        <p>
          Category - {category || 'any'}. Difficulty -{' '}
          {configuration?.difficulty}. Type - {configuration?.type}. Time -{' '}
          {configuration?.time}
        </p>
        <p>Total time - {timeTaken} seconds.</p>
        <MyButton buttonText="Restart" onClick={handleRestartButton} />
        <MyButton
          buttonText="Choose another quiz"
          onClick={handleAnotherQuizButton}
        />
      </div>
    </motion.div>
  );
};

export default QuizResults;
