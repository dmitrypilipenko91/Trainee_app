import { Action, ThunkAction, configureStore } from '@reduxjs/toolkit';
import quizSettingsReducer from '../slices/quizSettingsSlice';
import quizResultsReducer from '../slices/quizResultsSlice';
import selectedValuesReducer from '../slices/selectedValuesSlice';

const store = configureStore({
  reducer: {
    quizSettings: quizSettingsReducer,
    quizResults: quizResultsReducer,
    selectedValues: selectedValuesReducer,
  },
});

export type AppStore = typeof store;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type AppThunk = ThunkAction<void, RootState, unknown, Action>;

export default store;
