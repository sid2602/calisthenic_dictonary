import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Routine } from "types/routine";
export enum ModalTypeTypes {
  exercises = "exercises",
  routines = "routines",
  singleRoutine = "singleRoutine",
}

export type ModalTypes = {
  modal: {
    type: ModalTypeTypes;
    isOpen: boolean;
    activeRoutine: number | null;
    routines: Routine[] | null;
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

export type ModalT = {
  modal: ModalTypes;
};

const initialState = {
  modal: {
    type: "exercises",
    isOpen: false,
    activeRoutine: null,
    routines: null,
  },
} as ModalTypes;

export const ModalSlice = createSlice({
  name: "modal",
  initialState,
  reducers: {
    handleClose: (state) => {
      state.modal.isOpen = false;
    },
    handleClick: (state, action: PayloadAction<ModalHandleClick>) => {
      state.modal.isOpen = true;
      state.modal.type = action.payload.type;
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
  },
});

export const {
  handleClick,
  handleClose,
  setActiveRoutine,
  setRoutines,
} = ModalSlice.actions;

export default ModalSlice.reducer;
