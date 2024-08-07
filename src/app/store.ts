import { configureStore } from '@reduxjs/toolkit';
import quizSettingsReducer from '../slices/quizSettingsSlice';
import quizResultsReducer from '../slices/quizResultsSlice';

const store = configureStore({
  reducer: {
    quizSettings: quizSettingsReducer,
    quizResults: quizResultsReducer,
  },
});

export type AppStore = typeof store;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
