import { useNavigate } from 'react-router-dom';
import MyButton from '../components/UI/button/MyButton';
import Input from '../components/UI/input/Input';
import MySelect from '../components/UI/select/MySelect';
import { paths } from '../utils/paths';

const timeOptions = [
  { value: '1m', label: '1m' },
  { value: '2m', label: '2m' },
  { value: '5m', label: '5m' },
];

const QuizSettings = () => {
  const navigate = useNavigate();

  const handleStartButtonClick = () => {
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
      />
      <MySelect labelText="Category" options={[]} />
      <MySelect labelText="Difficulty" options={[]} />
      <MySelect labelText="Type" options={[]} />
      <MySelect options={timeOptions} labelText="Time" />
      <MyButton buttonText="Start quiz" onClick={handleStartButtonClick} />
      <MyButton buttonText="See my stats" onClick={handleSeeStatsButtonClick} />
    </>
  );
};

export default QuizSettings;
