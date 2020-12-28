import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export enum SnackbarType {
  success = "success",
  error = "error",
  info = "info",
  warning = "warning",
}

export type SnackBarTypes = {
  snackbar: {
    type: SnackbarType;
    isOpen: boolean;
  };
};

const initialState = {
  snackbar: {
    type: "success",
    isOpen: false,
  },
} as SnackBarTypes;
export const SnackBarSlice = createSlice({
  name: "snackbar",
  initialState,
  reducers: {
    handleClose: (state) => {
      state.snackbar.isOpen = false;
    },
    handleClick: (state, action: PayloadAction<SnackbarType>) => {
      state.snackbar.isOpen = true;
      state.snackbar.type = action.payload;
    },
  },
});

export const { handleClick, handleClose } = SnackBarSlice.actions;

export default SnackBarSlice.reducer;
