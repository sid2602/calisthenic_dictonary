import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Training } from "types/training";
export type TrainingTypes = {
  training: {
    trainings: Training[];
  };
};

export type TrainingHandleChange = {
  trainings: Training[];
};

export type TrainingT = {
  training: TrainingTypes;
};

const initialState = {
  training: {
    trainings: [],
  },
} as TrainingTypes;

export const TrainingSlice = createSlice({
  name: "date",
  initialState,
  reducers: {
    setTraining: (state, action: PayloadAction<TrainingHandleChange>) => {
      state.training.trainings = action.payload.trainings;
    },
  },
});

export const { setTraining } = TrainingSlice.actions;

export default TrainingSlice.reducer;
