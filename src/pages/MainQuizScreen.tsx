import { useState } from 'react';
import MyButton from '../components/UI/button/MyButton';
import ProgressBar from '../components/UI/progress_bar/ProgressBar';
import QuestionBlock from '../components/UI/question_block/QuestionBlock';
import MySelect from '../components/UI/select/MySelect';
import Timer from '../components/UI/timer/Timer';

const handleButtonClick = () => {
  console.log('Button clicked!');
};

const quizQuestions = [
  { id: 1, content: 'The Earth is flat.' },
  { id: 2, content: 'Which planet is known as the Red Planet?' },
  { id: 3, content: 'Humans share 50% of their DNA with bananas.' },
  { id: 4, content: 'What is the capital of France?' },
  { id: 5, content: 'The chemical symbol for gold is Au.' },
];

const answers = [
  { id: 1, questionId: 1, option: 'True' },
  { id: 2, questionId: 1, option: 'False' },
  { id: 3, questionId: 2, option: 'Earth' },
  { id: 4, questionId: 2, option: 'Mars' },
  { id: 5, questionId: 3, option: 'True' },
  { id: 6, questionId: 3, option: 'False' },
  { id: 7, questionId: 4, option: 'Berlin' },
  { id: 8, questionId: 4, option: 'Madrid' },
  { id: 9, questionId: 4, option: 'Paris' },
  { id: 10, questionId: 4, option: 'Lisbon' },
  { id: 11, questionId: 5, option: 'True' },
  { id: 12, questionId: 5, option: 'False' },
];

const correctAnswers = [
  { answerId: 2, questionId: 1 },
  { answerId: 4, questionId: 2 },
  { answerId: 5, questionId: 3 },
  { answerId: 9, questionId: 4 },
  { answerId: 11, questionId: 5 },
];

const getAnswersByQuestionId = (questionId: number) => {
  answers.filter((answer) => answer.questionId === questionId);
};

const isCorrectAnswer = (questionId: number, chosenAnswerId: number) => {
  return Boolean(
    correctAnswers.find(
      (answer) =>
        answer.questionId === questionId && answer.answerId === chosenAnswerId,
    ),
  );
};

const MainQuizScreen: React.FC = () => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);

  const nextQuestion = () => {
    setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
  }; // for the future implementation of changing questions;

  return (
    <>
      {currentQuestionIndex < quizQuestions.length ? (
        <QuestionBlock
          questionText={quizQuestions[currentQuestionIndex].content}
        />
      ) : (
        <div className="quizCompletion">Quiz completed!</div>
      )}
      <ProgressBar
        currentQuestion={currentQuestionIndex + 1}
        totalQuestions={quizQuestions.length}
      />
      <div className="answerBtns">
        <MyButton buttonText="True" onClick={handleButtonClick} />
        <MyButton buttonText="False" onClick={handleButtonClick} />
        <MySelect labelText="" options={[]} />
      </div>
      <MyButton buttonText="End quiz" onClick={handleButtonClick} />
      <Timer />
    </>
  );
};

export default MainQuizScreen;
