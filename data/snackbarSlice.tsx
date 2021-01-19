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
    message: string;
  };
};

export type SnackBarHandleClick = {
  type: SnackbarType;
  message: string;
};

const initialState = {
  snackbar: {
    type: "success",
    isOpen: false,
    message: "",
  },
} as SnackBarTypes;
export const SnackBarSlice = createSlice({
  name: "snackbar",
  initialState,
  reducers: {
    handleClose: (state) => {
      state.snackbar.isOpen = false;
    },
    openSnackbar: (state, action: PayloadAction<SnackBarHandleClick>) => {
      state.snackbar.isOpen = true;
      state.snackbar.type = action.payload.type;
      state.snackbar.message = action.payload.message;
    },
  },
});

export const { openSnackbar, handleClose } = SnackBarSlice.actions;

export default SnackBarSlice.reducer;
