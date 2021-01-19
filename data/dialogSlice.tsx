import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export enum DialogType {
  add_new_routine = "add_new_routine",
}

export type DialogTypes = {
  dialog: {
    type: DialogType;
    isOpen: boolean;
  };
};

export type DialogHandleClick = {
  type: DialogType;
};

export type DialogT = {
  dialog: DialogTypes;
};

const initialState = {
  dialog: {
    type: "add_new_routine",
    isOpen: false,
  },
} as DialogTypes;

export const DialogSlice = createSlice({
  name: "dialog",
  initialState,
  reducers: {
    handleClose: (state) => {
      state.dialog.isOpen = false;
    },
    openDialog: (state, action: PayloadAction<DialogHandleClick>) => {
      state.dialog.isOpen = true;
      state.dialog.type = action.payload.type;
    },
  },
});

export const { openDialog, handleClose } = DialogSlice.actions;

export default DialogSlice.reducer;
