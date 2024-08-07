import { createSlice } from '@reduxjs/toolkit';

export interface ResultsState {
  correctAnswers: number;
}

const initialState: ResultsState = {
  correctAnswers: 0,
};

const quizResultsSlice = createSlice({
  name: 'quizResults',
  initialState,
  reducers: {
    incrementCorrectAnswers(state) {
      state.correctAnswers += 1;
    },
    clearResults(state) {
      state.correctAnswers = 0;
    },
  },
});

export const { incrementCorrectAnswers, clearResults } =
  quizResultsSlice.actions;
export default quizResultsSlice.reducer;
