import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export enum ModalTypeTypes {
  exercises = "exercises",
  routines = "routines",
  singleRoutine = "singleRoutine",
}

export type ModalTypes = {
  modal: {
    type: ModalTypeTypes;
    isOpen: boolean;
  };
};

export type ModalHandleClick = {
  type: ModalTypeTypes;
};

const initialState = {
  modal: {
    type: "exercises",
    isOpen: false,
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
  },
});

export const { handleClick, handleClose } = ModalSlice.actions;

export default ModalSlice.reducer;
