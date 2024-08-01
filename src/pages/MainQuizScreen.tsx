import { useEffect, useMemo, useState } from 'react';
import MyButton from '../components/UI/button/MyButton';
import ProgressBar from '../components/UI/progress_bar/ProgressBar';
import QuestionBlock from '../components/UI/question_block/QuestionBlock';
import Timer from '../components/UI/timer/Timer';
import '../App.css';
import Modal from '../components/UI/modal/Modal';
import { useNavigate } from 'react-router-dom';
import { paths } from '../utils/paths';

const FEEDBACK = {
  CORRECT: "It's correct!",
  INCORRECT: "It's incorrect!",
  default: '',
};

interface Question {
  id: number;
  content: string;
  type: string;
}

interface Answer {
  id: number;
  questionId: number;
  option: string;
}

const quizQuestions: Question[] = [
  { id: 1, content: 'The Earth is flat.', type: 'true_false' },
  {
    id: 2,
    content: 'Which planet is known as the Red Planet?',
    type: 'multiple_choice',
  },
  {
    id: 3,
    content: 'Humans share 50% of their DNA with bananas.',
    type: 'true_false',
  },
  { id: 4, content: 'What is the capital of France?', type: 'multiple_choice' },
  { id: 5, content: 'The chemical symbol for gold is Au.', type: 'true_false' },
];

const answers: Answer[] = [
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
  return answers.filter((answer) => answer.questionId === questionId);
};

const isCorrectAnswer = (
  questionId: number,
  chosenAnswerId: number,
): boolean => {
  return Boolean(
    correctAnswers.find(
      (answer) =>
        answer.questionId === questionId && answer.answerId === chosenAnswerId,
    ),
  );
};

const MainQuizScreen: React.FC = () => {
  const [currentQuestionId, setCurrentQuestionId] = useState<number>(1);
  const [feedback, setFeedback] = useState<string>(FEEDBACK.default);
  const [isQuizCompleted, setIsQuizCompleted] = useState<boolean>(false);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const handleToggleOpenModal = () => {
    setIsModalOpen((value) => !value);
  };

  const navigate = useNavigate();

  const handleConfirmModal = () => {
    navigate(paths.home);
  };

  const finishQuiz = () => {
    setTimeout(() => navigate(paths.results), 1500);
  };

  const [question, answers]: [Question | undefined, Answer[]] = useMemo(() => {
    const _question = quizQuestions.find((q) => q.id === currentQuestionId);
    const _answers = getAnswersByQuestionId(currentQuestionId);
    return [_question, _answers];
  }, [currentQuestionId]);

  useEffect(() => {
    if (feedback) {
      const timer = setTimeout(() => {
        handleNextQuestion();
        setFeedback(FEEDBACK.default);
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [feedback]);

  const handleAnswerClick = (chosenAnswerId: number) => {
    setFeedback(() =>
      isCorrectAnswer(currentQuestionId, chosenAnswerId)
        ? FEEDBACK.CORRECT
        : FEEDBACK.INCORRECT,
    );
  };

  const handleNextQuestion = () => {
    const nextQuestion = quizQuestions.find(
      (q) => q.id === currentQuestionId + 1,
    );
    if (nextQuestion) {
      setCurrentQuestionId(nextQuestion.id);
    } else {
      setIsQuizCompleted(true);
      finishQuiz();
    }
  };

  return (
    <>
      {question && !isQuizCompleted ? (
        <QuestionBlock questionText={question.content} />
      ) : (
        <div className="quizCompletion">Quiz completed!</div>
      )}
      <ProgressBar
        currentQuestion={currentQuestionId}
        totalQuestions={quizQuestions.length}
      />
      <div className="answerBtns">
        {question?.type === 'true_false' ? (
          <>
            {answers.map((answer) => {
              if (answer.option === 'True') {
                return (
                  <MyButton
                    key={answer.id}
                    buttonText="True"
                    onClick={() => handleAnswerClick(answer.id)}
                  />
                );
              } else if (answer.option === 'False') {
                return (
                  <MyButton
                    key={answer.id}
                    buttonText="False"
                    onClick={() => handleAnswerClick(answer.id)}
                  />
                );
              }
              return null;
            })}
          </>
        ) : (
          answers.map((answer) => (
            <MyButton
              key={answer.id}
              buttonText={answer.option}
              onClick={() => handleAnswerClick(answer.id)}
            />
          ))
        )}
      </div>
      {feedback && <div className="feedback">{feedback}</div>}
      <MyButton
        buttonText="End quiz"
        onClick={() => {
          setIsQuizCompleted(true);
          handleToggleOpenModal();
        }}
      />
      <Timer onFinish={finishQuiz} />
      <Modal
        isOpen={isModalOpen}
        onClose={handleToggleOpenModal}
        onConfirm={handleConfirmModal}
        modalText="Do you really want to end quiz?"
      />
    </>
  );
};

export default MainQuizScreen;
