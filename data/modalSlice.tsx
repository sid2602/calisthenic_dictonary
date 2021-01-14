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
    routine: Routine | null;
  };
};

export type ModalHandleClick = {
  type: ModalTypeTypes;
};

export type SetRoutineType = {
  routine: Routine;
};

const initialState = {
  modal: {
    type: "exercises",
    isOpen: false,
    routine: null,
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
    setRoutine: (state, action: PayloadAction<SetRoutineType>) => {
      state.modal.routine = action.payload.routine;
      state.modal.type = ModalTypeTypes.singleRoutine;
    },
  },
});

export const { handleClick, handleClose, setRoutine } = ModalSlice.actions;

export default ModalSlice.reducer;
