import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Training } from "types/training";
export type TrainingTypes = {
  training: {
    training: Training[];
  };
};

export type TrainingHandleChange = {
  training: Training[];
};

export type TrainingT = {
  date: TrainingTypes;
};

const initialState = {
  training: {
    training: [],
  },
} as TrainingTypes;

export const TrainingSlice = createSlice({
  name: "date",
  initialState,
  reducers: {
    setTraining: (state, action: PayloadAction<TrainingHandleChange>) => {
      state.training.training = action.payload.training;
    },
  },
});

export const { setTraining } = TrainingSlice.actions;

export default TrainingSlice.reducer;
