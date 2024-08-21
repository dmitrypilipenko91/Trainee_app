import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface StatsState {
  totalQuestions: number;
  totalCorrectAnswers: number;
  categoryStats: { [key: string]: number };
  difficultyStats: { [key: string]: number };
  typeStats: { [key: string]: number };
}

const initialState: StatsState = {
  totalQuestions: 0,
  totalCorrectAnswers: 0,
  categoryStats: {},
  difficultyStats: {},
  typeStats: {},
};

const statsSlice = createSlice({
  name: 'stats',
  initialState,
  reducers: {
    updateStats: (
      state,
      action: PayloadAction<{
        numberOfQuestions: number;
        correctAnswers: number;
        category: string;
        difficulty: string;
        type: string;
      }>,
    ) => {
      const { numberOfQuestions, correctAnswers, category, difficulty, type } =
        action.payload;

      state.totalQuestions += numberOfQuestions;
      state.totalCorrectAnswers += correctAnswers;

      state.categoryStats[category] =
        (state.categoryStats[category] || 0) + numberOfQuestions;
      state.difficultyStats[difficulty] =
        (state.difficultyStats[difficulty] || 0) + numberOfQuestions;
      state.typeStats[type] = (state.typeStats[type] || 0) + numberOfQuestions;
    },
    clearStats: () => initialState,
  },
});

export const { updateStats, clearStats } = statsSlice.actions;
export default statsSlice.reducer;
