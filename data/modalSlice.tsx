import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Routine } from "types/routine";
export enum ModalTypeTypes {
  exercises = "exercises",
  routines = "routines",
  singleRoutine = "singleRoutine",
  profile = "profile",
}

export type ModalTypes = {
  modal: {
    type: ModalTypeTypes;
    isOpen: boolean;
    activeRoutine: number | null;
    routines: Routine[] | null;
    addExerciseToRoutineFlag: boolean;
    addExerciseToTrainingFlag: boolean;
    addRoutineToTrainingFlag: boolean;
  };
};

export type ModalHandleClick = {
  type: ModalTypeTypes;
};

export type SetRoutinesType = {
  routines: Routine[] | null;
};

export type SetActiveRoutineType = {
  activeRoutine: number | null;
};

export type SetAddExerciseToRoutine = {
  addExerciseToRoutineFlag?: boolean;
  addExerciseToTrainingFlag?: boolean;
  addRoutineToTrainingFlag?: boolean;
};

export type ModalT = {
  modal: ModalTypes;
};

const initialState = {
  modal: {
    type: "exercises",
    isOpen: false,
    activeRoutine: null,
    routines: null,
    addExerciseToRoutineFlag: false,
    addExerciseToTrainingFlag: false,
    addRoutineToTrainingFlag: false,
  },
} as ModalTypes;

export const ModalSlice = createSlice({
  name: "modal",
  initialState,
  reducers: {
    handleClose: (state) => {
      state.modal.isOpen = false;
      state.modal.addExerciseToRoutineFlag = false;
      state.modal.addExerciseToTrainingFlag = false;
      state.modal.addRoutineToTrainingFlag = false;
    },
    openModal: (state, action: PayloadAction<ModalHandleClick>) => {
      state.modal.isOpen = true;
      state.modal.type = action.payload.type;
      state.modal.addExerciseToRoutineFlag = false;
      state.modal.addExerciseToTrainingFlag = false;
      state.modal.addRoutineToTrainingFlag = false;
    },
    setRoutines: (state, action: PayloadAction<SetRoutinesType>) => {
      state.modal.routines = action.payload.routines;
    },
    setActiveRoutine: (state, action: PayloadAction<SetActiveRoutineType>) => {
      if (state.modal.routines !== null) {
        const findActiveRoutine = state.modal.routines.findIndex(
          (routine) => routine.id === action.payload.activeRoutine
        );

        state.modal.activeRoutine =
          findActiveRoutine > -1 ? findActiveRoutine : null;
        state.modal.type = ModalTypeTypes.singleRoutine;
      }
    },
    setFlags: (state, action: PayloadAction<SetAddExerciseToRoutine>) => {
      const {
        addExerciseToRoutineFlag,
        addExerciseToTrainingFlag,
        addRoutineToTrainingFlag,
      } = action.payload;

      if (addExerciseToRoutineFlag) {
        state.modal.addExerciseToRoutineFlag = addExerciseToRoutineFlag;

        if (addExerciseToRoutineFlag === true) {
          state.modal.type = ModalTypeTypes.exercises;
        } else {
          state.modal.type = ModalTypeTypes.singleRoutine;
        }
      } else if (addExerciseToTrainingFlag) {
        state.modal.addExerciseToTrainingFlag = addExerciseToTrainingFlag;
        state.modal.addRoutineToTrainingFlag = false;
        if (addExerciseToTrainingFlag === true) {
          state.modal.type = ModalTypeTypes.exercises;
          state.modal.isOpen = true;
        }
      } else if (addRoutineToTrainingFlag) {
        state.modal.addRoutineToTrainingFlag = addRoutineToTrainingFlag;
        state.modal.addExerciseToTrainingFlag = false;
        if (addRoutineToTrainingFlag === true) {
          state.modal.isOpen = true;
          state.modal.type = ModalTypeTypes.routines;
        }
      }
    },
  },
});

export const {
  openModal,
  handleClose,
  setActiveRoutine,
  setRoutines,
  setFlags,
} = ModalSlice.actions;

export default ModalSlice.reducer;
