import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface SelectedValuesState {
  numberOfQuestions: number | null;
  selectedCategory: {
    value: string;
    label: string;
  } | null;
  selectedDifficulty: {
    value: string;
    label: string;
  } | null;
  selectedType: {
    value: string;
    label: string;
  } | null;
  selectedTime: {
    value: string;
    label: string;
  } | null;
}

const initialState: SelectedValuesState = {
  numberOfQuestions: null,
  selectedCategory: null,
  selectedDifficulty: null,
  selectedType: null,
  selectedTime: null,
};

const selectedValuesSlice = createSlice({
  name: 'selectedValues',
  initialState,
  reducers: {
    setNumberOfQuestions(state, action: PayloadAction<number | null>) {
      state.numberOfQuestions = action.payload;
    },
    setSelectedCategory(
      state,
      action: PayloadAction<{ value: string; label: string } | null>,
    ) {
      state.selectedCategory = action.payload;
    },
    setSelectedDifficulty(
      state,
      action: PayloadAction<{ value: string; label: string } | null>,
    ) {
      state.selectedDifficulty = action.payload;
    },
    setSelectedType(
      state,
      action: PayloadAction<{ value: string; label: string } | null>,
    ) {
      state.selectedType = action.payload;
    },
    setSelectedTime(
      state,
      action: PayloadAction<{ value: string; label: string } | null>,
    ) {
      state.selectedTime = action.payload;
    },
    clearSelectedValues(state) {
      state.numberOfQuestions = null;
      state.selectedCategory = null;
      state.selectedDifficulty = null;
      state.selectedType = null;
      state.selectedTime = null;
    },
  },
});

export const {
  setNumberOfQuestions,
  setSelectedCategory,
  setSelectedDifficulty,
  setSelectedType,
  setSelectedTime,
  clearSelectedValues,
} = selectedValuesSlice.actions;

export default selectedValuesSlice.reducer;
