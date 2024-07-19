import classes from './QuestionBlock.module.css';

interface QuestionBlockProps {
  questionText: string;
}

const QuestionBlock: React.FC<QuestionBlockProps> = ({ questionText }) => {
  return <div className={classes.questionBlock}>{questionText}</div>;
};

export default QuestionBlock;
