import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { VariantType } from "types/exercises";
import { SingleSet } from "types/training";

export enum DialogType {
  add_new_routine = "add_new_routine",
  edit_routine = "edit_routine",
  add_serie = "add_serie",
}

export type DialogTypes = {
  dialog: {
    type: DialogType;
    isOpen: boolean;
    exerciseVariant: VariantType;
    activeSingleSet: number;
  };
};

export type DialogHandleClick = {
  type: DialogType;
  variant?: VariantType;
  activeSingleSet?: number;
};

export type DialogT = {
  dialog: DialogTypes;
};

const initialState = {
  dialog: {
    type: "add_new_routine",
    isOpen: false,
    exerciseVariant: VariantType.rep,
    activeSingleSet: 0,
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

      const { variant, activeSingleSet } = action.payload;
      if (variant) state.dialog.exerciseVariant = variant;
      if (activeSingleSet) state.dialog.activeSingleSet = activeSingleSet;
    },
  },
});

export const { openDialog, handleClose } = DialogSlice.actions;

export default DialogSlice.reducer;
