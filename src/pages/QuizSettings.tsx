import { useNavigate } from 'react-router-dom';
import MyButton from '../components/UI/button/MyButton';
import Input from '../components/UI/input/Input';
import MySelect from '../components/UI/select/MySelect';
import { paths } from '../utils/paths';
import { useAppDispatch } from '../app/hooks';
import { useEffect, useState } from 'react';
import { setConfiguration, setStartTime } from '../slices/quizSettingsSlice';

const timeOptions = [
  { value: '1m', label: '1m' },
  { value: '2m', label: '2m' },
  { value: '5m', label: '5m' },
];

const QuizSettings = () => {
  const [numberOfQuestions, setNumberOfQuestions] = useState<number | null>(
    null,
  );
  const [selectedCategory, setSelectedCategory] = useState<{
    value: string;
    label: string;
  } | null>(null);
  const [selectedDifficulty, setSelectedDifficulty] = useState<{
    value: string;
    label: string;
  } | null>(null);
  const [selectedType, setSelectedType] = useState<{
    value: string;
    label: string;
  } | null>(null);
  const [selectedTime, setSelectedTime] = useState<{
    value: string;
    label: string;
  } | null>(null);
  const [categories, setCategories] = useState<
    { value: string; label: string }[]
  >([]);

  const navigate = useNavigate();

  const dispatch = useAppDispatch();

  interface Category {
    id: string;
    name: string;
  }

  const fetchCategories = async () => {
    try {
      const response = await fetch('https://opentdb.com/api_category.php');
      const data = await response.json();
      const categoryOptions = [
        { value: 'any', label: 'Any Category' },
        ...data.trivia_categories.map((category: Category) => ({
          value: category.id,
          label: category.name,
        })),
      ];
      setCategories(categoryOptions);
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const handleStartButtonClick = () => {
    const configuration = {
      numberOfQuestions: numberOfQuestions,
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

  return (
    <>
      <Input
        type="number"
        min={5}
        max={15}
        labelText="Number of questions (from 5 to 15)"
        onChange={(e) => setNumberOfQuestions(parseInt(e.target.value))}
      />
      <MySelect
        labelText="Category"
        options={categories}
        onChange={setSelectedCategory}
        value={selectedCategory}
      />
      <MySelect
        labelText="Difficulty"
        options={[
          { value: 'any', label: 'Any Difficulty' },
          { value: 'easy', label: 'Easy' },
          { value: 'medium', label: 'Medium' },
          { value: 'hard', label: 'Hard' },
        ]}
        onChange={setSelectedDifficulty}
        value={selectedDifficulty}
      />
      <MySelect
        labelText="Type"
        options={[
          { value: 'any', label: 'Any Type' },
          { value: 'multiple', label: 'Multiple Choice' },
          { value: 'boolean', label: 'True/False' },
        ]}
        onChange={setSelectedType}
        value={selectedType}
      />
      <MySelect
        labelText="Time"
        options={timeOptions}
        onChange={setSelectedTime}
        value={selectedTime}
      />
      <MyButton buttonText="Start quiz" onClick={handleStartButtonClick} />
      <MyButton buttonText="See my stats" onClick={handleSeeStatsButtonClick} />
    </>
  );
};

export default QuizSettings;
