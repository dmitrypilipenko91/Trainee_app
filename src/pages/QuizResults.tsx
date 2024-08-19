import MyButton from '../components/UI/button/MyButton';
import '../App.css';
import { useNavigate } from 'react-router-dom';
import { paths } from '../utils/paths';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { clearQuizState, setStartTime } from '../slices/quizSettingsSlice';
import { clearResults } from '../slices/quizResultsSlice';
import { clearSelectedValues } from '../slices/selectedValuesSlice';

const categoryMap: { [key: number]: string } = {
  9: 'General Knowledge',
  10: 'Books',
  11: 'Film',
  12: 'Music',
  13: 'Musicals and Theatres',
  14: 'Video Games',
  15: 'Board Games',
  16: 'Science & Nature',
  17: 'Science: Computers',
  18: 'Science: Gadgets',
  19: 'Science: Electronics',
  20: 'Science: Physics',
  21: 'Science: Biology',
  22: 'Politics',
  23: 'Art',
  24: 'Animals',
  25: 'Vehicles',
  26: 'History',
  27: 'Celebrities',
  28: 'Sports',
  29: 'Mythology',
  30: 'Geography',
  31: 'Entertainment: Video Games',
  32: 'Entertainment: Board Games',
  33: 'Entertainment: Comics',
  34: 'Entertainment: Japanese Anime & Manga',
  35: 'Entertainment: Cartoon & Animations',
};

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

  const timeTaken =
    startTime && endTime ? Math.floor((endTime - startTime) / 1000) : 0;

  const categoryID = configuration?.category;

  const categoryName =
    typeof categoryID === 'number' ? categoryMap[categoryID] : 'any';

  return (
    <div className="quiz_results_block">
      <h3>Thank you for completing this quiz. Here are your results:</h3>
      <p>
        You answered {correctAnswersCount} out of {questions.length} questions
        correctly
      </p>
      <p>
        Category - {categoryName}. Difficulty - {configuration?.difficulty}.
        Type - {configuration?.type}. Time - {configuration?.time}
      </p>
      <p>Total time - {timeTaken} seconds.</p>
      <MyButton buttonText="Restart" onClick={handleRestartButton} />
      <MyButton
        buttonText="Choose another quiz"
        onClick={handleAnotherQuizButton}
      />
    </div>
  );
};

export default QuizResults;
