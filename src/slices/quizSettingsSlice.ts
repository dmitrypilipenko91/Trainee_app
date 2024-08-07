import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Question } from '../pages/MainQuizScreen';

export interface QuizState {
  questions: Question[];
  answers: string[];
  configuration: {
    numberOfQuestions: number | null;
    category: string;
    difficulty: string;
    type: string;
    time: string;
  } | null;
  startTime: number | null;
  endTime: number | null;
}

const initialState: QuizState = {
  questions: [],
  answers: [],
  configuration: null,
  startTime: null,
  endTime: null,
};

const quizSettingsSlice = createSlice({
  name: 'quizSettings',
  initialState,
  reducers: {
    setConfiguration(state, action: PayloadAction<QuizState['configuration']>) {
      state.configuration = action.payload;
    },
    setQuestions(state, action: PayloadAction<Question[]>) {
      state.questions = action.payload;
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
});

export const {
  setConfiguration,
  setQuestions,
  clearQuizState,
  setStartTime,
  setEndTime,
} = quizSettingsSlice.actions;

export default quizSettingsSlice.reducer;
