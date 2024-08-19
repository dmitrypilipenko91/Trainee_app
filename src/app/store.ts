import { Action, ThunkAction, configureStore } from '@reduxjs/toolkit';
import { combineReducers } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import quizSettingsReducer from '../slices/quizSettingsSlice';
import quizResultsReducer from '../slices/quizResultsSlice';
import selectedValuesReducer from '../slices/selectedValuesSlice';
import statsReducer from '../slices/statsSlice';

const persistConfig = {
  key: 'root',
  version: 1,
  storage,
  whitelist: ['stats'],
};

const rootReducer = combineReducers({
  quizSettings: quizSettingsReducer,
  quizResults: quizResultsReducer,
  selectedValues: selectedValuesReducer,
  stats: statsReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer,
});

export const persistor = persistStore(store);

export type AppStore = typeof store;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type AppThunk = ThunkAction<void, RootState, unknown, Action>;

export default store;
