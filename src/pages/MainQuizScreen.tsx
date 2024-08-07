import { useEffect, useMemo, useState } from 'react';
import MyButton from '../components/UI/button/MyButton';
import ProgressBar from '../components/UI/progress_bar/ProgressBar';
import QuestionBlock from '../components/UI/question_block/QuestionBlock';
import Timer from '../components/UI/timer/Timer';
import '../App.css';
import Modal from '../components/UI/modal/Modal';
import { useNavigate } from 'react-router-dom';
import { paths } from '../utils/paths';
import { v4 as uuidv4 } from 'uuid';
import { decode } from 'he';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { setEndTime, setQuestions } from '../slices/quizSettingsSlice';
import { incrementCorrectAnswers } from '../slices/quizResultsSlice';

const FEEDBACK = {
  CORRECT: "It's correct!",
  INCORRECT: "It's incorrect!",
  default: '',
};

interface ApiQuestion {
  question: string;
  incorrect_answers: string[];
  correct_answer: string;
  type: string;
  difficulty: string;
  category: string;
}

export interface Question {
  id: string;
  content: string;
  answers: string[];
  correctAnswer: string;
  type: string;
  difficulty: string;
  category: string;
}

const MainQuizScreen: React.FC = () => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState<number>(0);
  const [feedback, setFeedback] = useState<string>(FEEDBACK.default);
  const [isQuizCompleted, setIsQuizCompleted] = useState<boolean>(false);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const handleToggleOpenModal = () => {
    setIsModalOpen((value) => !value);
  };

  const navigate = useNavigate();

  const dispatch = useAppDispatch();

  const handleConfirmModal = () => {
    navigate(paths.home);
  };

  const finishQuiz = () => {
    dispatch(setEndTime(Date.now()));
    setTimeout(() => navigate(paths.results), 1500);
  };

  const configuration = useAppSelector(
    (state) => state.quizSettings.configuration,
  );

  const questions = useAppSelector((state) => state.quizSettings.questions);

  const fetchQuestions = async () => {
    if (!configuration) return;
    const { numberOfQuestions, category, difficulty, type } = configuration;
    const categoryParam = category !== 'any' ? `&category=${category}` : '';
    const difficultyParam =
      difficulty !== 'any' ? `&difficulty=${difficulty}` : '';
    const typeParam = type !== 'any' ? `&type=${type}` : '';

    const url = `https://opentdb.com/api.php?amount=${numberOfQuestions}${categoryParam}${difficultyParam}${typeParam}`;
    try {
      const response = await fetch(url);
      const data = await response.json();

      const formattedQuestions = data.results.map((q: ApiQuestion) => ({
        id: uuidv4(),
        content: decode(q.question),
        answers: [
          ...q.incorrect_answers.map((answer) => decode(answer)),
          decode(q.correct_answer),
        ].sort(() => Math.random() - 0.5),
        correctAnswer: decode(q.correct_answer),
        type: q.type,
        difficulty: q.difficulty,
        category: q.category,
      }));
      dispatch(setQuestions(formattedQuestions));
    } catch (error) {
      console.error('Error fetching questions:', error);
    }
  };

  useEffect(() => {
    fetchQuestions();
  }, [configuration]);

  const question = useMemo(() => {
    if (questions.length > 0 && currentQuestionIndex < questions.length) {
      return questions[currentQuestionIndex];
    }
    return null;
  }, [questions, currentQuestionIndex]);

  useEffect(() => {
    if (feedback) {
      const timer = setTimeout(() => {
        handleNextQuestion();
        setFeedback(FEEDBACK.default);
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [feedback]);

  const handleAnswerClick = (chosenAnswer: string) => {
    const isCorrect = chosenAnswer === question?.correctAnswer;
    setFeedback(isCorrect ? FEEDBACK.CORRECT : FEEDBACK.INCORRECT);

    if (isCorrect) {
      dispatch(incrementCorrectAnswers());
    }
  };

  const handleNextQuestion = () => {
    const nextQuestionIndex = currentQuestionIndex + 1;
    if (nextQuestionIndex < questions.length) {
      setCurrentQuestionIndex(nextQuestionIndex);
    } else {
      setIsQuizCompleted(true);
      finishQuiz();
    }
  };

  return (
    <>
      {questions.length === 0 && (
        <div className="quizAbsence">Loading questions...</div>
      )}
      {question && !isQuizCompleted ? (
        <QuestionBlock questionText={question.content} />
      ) : isQuizCompleted ? (
        <div className="quizAbsence">Quiz completed!</div>
      ) : null}
      <ProgressBar
        currentQuestion={currentQuestionIndex + 1}
        totalQuestions={questions.length}
      />
      <div className="answerBtns">
        {question?.type === 'boolean' ? (
          <>
            <MyButton
              buttonText="True"
              onClick={() => handleAnswerClick('True')}
            />
            <MyButton
              buttonText="False"
              onClick={() => handleAnswerClick('False')}
            />
          </>
        ) : (
          question?.answers.map((answer) => (
            <MyButton
              key={answer}
              buttonText={answer}
              onClick={() => handleAnswerClick(answer)}
            />
          ))
        )}
      </div>
      {feedback && <div className="feedback">{feedback}</div>}
      <MyButton buttonText="End quiz" onClick={handleToggleOpenModal} />
      <Timer onFinish={finishQuiz} />
      <Modal
        isOpen={isModalOpen}
        onClose={handleToggleOpenModal}
        onConfirm={() => {
          setIsQuizCompleted(true);
          handleConfirmModal();
        }}
        modalText="Do you really want to end quiz?"
      />
    </>
  );
};

export default MainQuizScreen;
