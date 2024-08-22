import { render, screen, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import '@testing-library/jest-dom';
import QuizSettings from '../pages/QuizSettings';
import { configureStore } from '@reduxjs/toolkit';
import { MemoryRouter } from 'react-router-dom';
import quizSettingsReducer from '../slices/quizSettingsSlice';
import quizResultsReducer from '../slices/quizResultsSlice';
import selectedValuesReducer from '../slices/selectedValuesSlice';
import statsReducer from '../slices/statsSlice';

const createMockStore = () => {
  return configureStore({
    reducer: {
      selectedValues: selectedValuesReducer,
      quizResults: quizResultsReducer,
      quizSettings: quizSettingsReducer,
      stats: statsReducer,
    },
    preloadedState: {
      selectedValues: {
        numberOfQuestions: null,
        selectedCategory: null,
        selectedDifficulty: null,
        selectedType: null,
        selectedTime: null,
      },
      quizResults: {
        correctAnswers: 0,
      },
      quizSettings: {
        questions: [],
        answers: [],
        configuration: null,
        startTime: null,
        endTime: null,
        categories: [],
      },
      stats: {
        totalQuestions: 0,
        totalCorrectAnswers: 0,
        categoryStats: {},
        difficultyStats: {},
        typeStats: {},
      },
    },
  });
};

describe('QuizSettings Component - Basic Tests', () => {
  let store: ReturnType<typeof createMockStore>;

  beforeEach(() => {
    store = createMockStore();

    render(
      <Provider store={store}>
        <MemoryRouter>
          <QuizSettings />
        </MemoryRouter>
      </Provider>,
    );
  });

  test('should render the Category label for select', () => {
    expect(screen.getByText(/Category/i)).toBeInTheDocument();
  });

  test('should render the Start quiz button', () => {
    expect(screen.getByText(/Start quiz/i)).toBeInTheDocument();
  });

  test('should render the See my stats button', () => {
    expect(screen.getByText(/See my stats/i)).toBeInTheDocument();
  });

  test('should allow entering the number of questions', () => {
    const input = screen.getByLabelText(
      /Number of questions/i,
    ) as HTMLInputElement;
    fireEvent.change(input, { target: { value: '10' } });
    expect(input.value).toBe('10');
  });

  test('should have input type number', () => {
    const input = screen.getByLabelText(
      /Number of questions/i,
    ) as HTMLInputElement;
    expect(input.type).toBe('number');
  });

  test('should have the correct initial value for number of questions', () => {
    const input = screen.getByLabelText(
      /Number of questions/i,
    ) as HTMLInputElement;
    expect(input.value).toBe('');
  });

  test('should set number of questions to 5 if input is less than 5 or greater than 15', () => {
    const input = screen.getByLabelText(
      /Number of questions/i,
    ) as HTMLInputElement;

    fireEvent.change(input, { target: { value: '4' } });
    expect(store.getState().selectedValues.numberOfQuestions).toBe(5);

    fireEvent.change(input, { target: { value: '5' } });
    expect(store.getState().selectedValues.numberOfQuestions).toBe(5);

    fireEvent.change(input, { target: { value: '16' } });
    expect(store.getState().selectedValues.numberOfQuestions).toBe(5);

    fireEvent.change(input, { target: { value: '15' } });
    expect(store.getState().selectedValues.numberOfQuestions).toBe(15);
  });
});
