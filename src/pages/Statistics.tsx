import { useNavigate } from 'react-router-dom';
import '../App.css';
import { useAppSelector } from '../app/hooks';
import MyButton from '../components/UI/button/MyButton';
import { paths } from '../utils/paths';

const Statistics: React.FC = () => {
  const stats = useAppSelector((state) => state.stats);

  const navigate = useNavigate();

  return (
    <div className="stats_block">
      <h2>Statistics</h2>
      <p>Total Questions: {stats.totalQuestions}</p>
      <p>Total Correct Answers: {stats.totalCorrectAnswers}</p>

      <h3>Category Statistics:</h3>
      <ul>
        {Object.entries(stats.categoryStats).map(([category, number]) => (
          <li key={category}>
            {category}: {number}
          </li>
        ))}
      </ul>

      <h3>Difficulty Statistics:</h3>
      <ul>
        {Object.entries(stats.difficultyStats).map(([difficulty, number]) => (
          <li key={difficulty}>
            {difficulty}: {number}
          </li>
        ))}
      </ul>

      <h3>Type Statistics:</h3>
      <ul>
        {Object.entries(stats.typeStats).map(([type, number]) => (
          <li key={type}>
            {type}: {number}
          </li>
        ))}
      </ul>
      <MyButton
        buttonText="Back to settings"
        onClick={() => navigate(paths.home)}
      />
    </div>
  );
};

export default Statistics;
