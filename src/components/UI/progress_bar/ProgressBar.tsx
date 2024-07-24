import classes from './ProgressBar.module.css';

interface ProgressBarProps {
  currentQuestion: number;
  totalQuestions: number;
}

const ProgressBar: React.FC<ProgressBarProps> = ({
  currentQuestion,
  totalQuestions,
}) => {
  const quizProgress = currentQuestion / totalQuestions;

  return (
    <div className={classes.progressBarGroup}>
      <span>
        Question {currentQuestion} out of {totalQuestions}
      </span>
      <progress value={quizProgress} />
    </div>
  );
};

export default ProgressBar;
