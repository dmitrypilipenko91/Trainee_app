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
  {
    id: 1,
    questionText: 'The Earth is flat.',
    options: [
      { text: 'True', isCorrect: false },
      { text: 'False', isCorrect: true },
    ],
  },
  {
    id: 2,
    questionText: 'Which planet is known as the Red Planet?',
    options: [
      { text: 'Earth', isCorrect: false },
      { text: 'Mars', isCorrect: true },
      { text: 'Jupiter', isCorrect: false },
      { text: 'Saturn', isCorrect: false },
    ],
  },
  {
    id: 3,
    questionText: 'Humans share 50% of their DNA with bananas.',
    options: [
      { text: 'True', isCorrect: true },
      { text: 'False', isCorrect: false },
    ],
  },
  {
    id: 4,
    questionText: 'What is the capital of France?',
    options: [
      { text: 'Berlin', isCorrect: false },
      { text: 'Madrid', isCorrect: false },
      { text: 'Paris', isCorrect: true },
      { text: 'Lisbon', isCorrect: false },
    ],
  },
  {
    id: 5,
    questionText: 'The chemical symbol for gold is Au.',
    options: [
      { text: 'True', isCorrect: true },
      { text: 'False', isCorrect: false },
    ],
  },
];

const MainQuizScreen = () => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);

  const nextQuestion = () => {
    setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
  }; // for the future implementation of changing questions;

  return (
    <>
      {currentQuestionIndex < quizQuestions.length ? (
        <QuestionBlock
          questionText={quizQuestions[currentQuestionIndex].questionText}
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
