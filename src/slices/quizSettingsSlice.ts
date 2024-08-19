import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Question } from '../pages/MainQuizScreen';
import { nanoid } from 'nanoid';
import { decode } from 'he';
import { Option } from '../components/UI/select/MySelect';

export interface QuizConfiguration {
  numberOfQuestions: number | null;
  category: string;
  difficulty: string;
  type: string;
  time: string;
}

export interface QuizState {
  questions: Question[];
  answers: string[];
  configuration: QuizConfiguration | null;
  startTime: number | null;
  endTime: number | null;
  categories: Option[];
}

interface ApiQuestion {
  question: string;
  incorrect_answers: string[];
  correct_answer: string;
  type: string;
  difficulty: string;
  category: string;
}

interface Category {
  id: number;
  name: string;
}

const initialState: QuizState = {
  questions: [],
  answers: [],
  configuration: null,
  startTime: null,
  endTime: null,
  categories: [],
};

export const fetchCategories = createAsyncThunk(
  'quizSettings/fetchCategories',
  async () => {
    const response = await fetch('https://opentdb.com/api_category.php');
    const data = await response.json();
    const categoryOptions = [
      { value: 'any', label: 'Any Category' },
      ...data.trivia_categories.map((category: Category) => ({
        value: category.id,
        label: category.name,
      })),
    ];
    return categoryOptions;
  },
);

export const fetchQuestions = createAsyncThunk(
  'quizSettings/fetchQuestions',
  async (configuration: QuizConfiguration) => {
    const { numberOfQuestions, category, difficulty, type } = configuration;
    const categoryParam = category !== 'any' ? `&category=${category}` : '';
    const difficultyParam =
      difficulty !== 'any' ? `&difficulty=${difficulty}` : '';
    const typeParam = type !== 'any' ? `&type=${type}` : '';

    const url = `https://opentdb.com/api.php?amount=${numberOfQuestions}${categoryParam}${difficultyParam}${typeParam}`;
    const response = await fetch(url);
    const data = await response.json();

    const formattedQuestions = data.results.map((q: ApiQuestion) => ({
      id: nanoid(),
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

    return formattedQuestions;
  },
);

const quizSettingsSlice = createSlice({
  name: 'quizSettings',
  initialState,
  reducers: {
    setConfiguration(state, action: PayloadAction<QuizState['configuration']>) {
      state.configuration = action.payload;
    },
    clearQuizState(state) {
      state.questions = [];
      state.answers = [];
      state.configuration = null;
    },
    setStartTime(state, action: PayloadAction<number>) {
      state.startTime = action.payload;
    },
    setEndTime(state, action: PayloadAction<number>) {
      state.endTime = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchCategories.fulfilled, (state, action) => {
      state.categories = action.payload;
    });
    builder.addCase(fetchQuestions.fulfilled, (state, action) => {
      state.questions = action.payload;
    });
  },
});

export const { setConfiguration, clearQuizState, setStartTime, setEndTime } =
  quizSettingsSlice.actions;

export default quizSettingsSlice.reducer;
