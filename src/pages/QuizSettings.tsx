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
import { ActionCreatorWithPayload } from '@reduxjs/toolkit';
import { motion } from 'framer-motion';

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
    dispatch(
      setConfiguration({
        numberOfQuestions: numberOfQuestions || 5,
        category: selectedCategory?.value || 'any',
        difficulty: selectedDifficulty?.value || 'any',
        type: selectedType?.value || 'any',
        time: selectedTime?.value || '2m',
      }),
    );
    dispatch(setStartTime(Date.now()));
    navigate(paths.main);
  };

  const handleSeeStatsButtonClick = () => {
    navigate(paths.stats);
  };

  const handleChange =
    (
      callback: ActionCreatorWithPayload<{
        value: string;
        label: string;
      } | null>,
    ) =>
    (value: Option | null) => {
      dispatch(callback(value));
    };

  return (
    <motion.div
      initial={{ opacity: 0, y: -100 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1 }}
    >
      <Input
        type="number"
        min={5}
        max={15}
        labelText="Number of questions (from 5 to 15)"
        htmlFor="input"
        id="input"
        onChange={(e) => {
          const value = parseInt(e.target.value);
          if (value > 15 || value < 5) {
            dispatch(setNumberOfQuestions(5));
          } else dispatch(setNumberOfQuestions(value));
        }}
      />
      <MySelect
        labelText="Category"
        options={categories}
        onChange={handleChange(setSelectedCategory)}
        value={selectedCategory}
      />
      <MySelect
        labelText="Difficulty"
        options={difficultyOptions}
        onChange={handleChange(setSelectedDifficulty)}
        value={selectedDifficulty}
      />
      <MySelect
        labelText="Type"
        options={typeOptions}
        onChange={handleChange(setSelectedType)}
        value={selectedType}
      />
      <MySelect
        labelText="Time"
        options={timeOptions}
        onChange={handleChange(setSelectedTime)}
        value={selectedTime}
      />
      <MyButton buttonText="Start quiz" onClick={handleStartButtonClick} />
      <MyButton buttonText="See my stats" onClick={handleSeeStatsButtonClick} />
    </motion.div>
  );
};

export default QuizSettings;
