import { useNavigate } from 'react-router-dom';
import MyButton from '../components/UI/button/MyButton';
import Input from '../components/UI/input/Input';
import MySelect, { Option } from '../components/UI/select/MySelect';
import { paths } from '../utils/paths';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { useEffect } from 'react';
import {
  fetchCategories,
  setConfiguration,
  setStartTime,
} from '../slices/quizSettingsSlice';
import {
  setNumberOfQuestions,
  setSelectedCategory,
  setSelectedDifficulty,
  setSelectedTime,
  setSelectedType,
} from '../slices/selectedValuesSlice';

const timeOptions = [
  { value: '1m', label: '1m' },
  { value: '2m', label: '2m' },
  { value: '5m', label: '5m' },
];

const difficultyOptions = [
  { value: 'any', label: 'Any Difficulty' },
  { value: 'easy', label: 'Easy' },
  { value: 'medium', label: 'Medium' },
  { value: 'hard', label: 'Hard' },
];

const typeOptions = [
  { value: 'any', label: 'Any Type' },
  { value: 'multiple', label: 'Multiple Choice' },
  { value: 'boolean', label: 'True/False' },
];

const QuizSettings = () => {
  const navigate = useNavigate();

  const dispatch = useAppDispatch();

  const {
    numberOfQuestions,
    selectedCategory,
    selectedDifficulty,
    selectedType,
    selectedTime,
  } = useAppSelector((state) => state.selectedValues);

  const categories = useAppSelector((state) => state.quizSettings.categories);

  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

  const handleStartButtonClick = () => {
    const configuration = {
      numberOfQuestions: numberOfQuestions || 5,
      category: selectedCategory?.value || 'any',
      difficulty: selectedDifficulty?.value || 'any',
      type: selectedType?.value || 'any',
      time: selectedTime?.value || '2m',
    };

    dispatch(setConfiguration(configuration));
    dispatch(setStartTime(Date.now()));
    navigate(paths.main);
  };

  const handleSeeStatsButtonClick = () => {
    navigate(paths.stats);
  };

  const handleCategoryChange = (value: Option | null) => {
    dispatch(setSelectedCategory(value));
  };

  const handleDifficultyChange = (value: Option | null) => {
    dispatch(setSelectedDifficulty(value));
  };

  const handleTypeChange = (value: Option | null) => {
    dispatch(setSelectedType(value));
  };

  const handleTimeChange = (value: Option | null) => {
    dispatch(setSelectedTime(value));
  };

  return (
    <>
      <Input
        type="number"
        min={5}
        max={15}
        labelText="Number of questions (from 5 to 15)"
        onChange={(e) =>
          dispatch(setNumberOfQuestions(parseInt(e.target.value)))
        }
      />
      <MySelect
        labelText="Category"
        options={categories}
        onChange={handleCategoryChange}
        value={selectedCategory}
      />
      <MySelect
        labelText="Difficulty"
        options={difficultyOptions}
        onChange={handleDifficultyChange}
        value={selectedDifficulty}
      />
      <MySelect
        labelText="Type"
        options={typeOptions}
        onChange={handleTypeChange}
        value={selectedType}
      />
      <MySelect
        labelText="Time"
        options={timeOptions}
        onChange={handleTimeChange}
        value={selectedTime}
      />
      <MyButton buttonText="Start quiz" onClick={handleStartButtonClick} />
      <MyButton buttonText="See my stats" onClick={handleSeeStatsButtonClick} />
    </>
  );
};

export default QuizSettings;
