import { configureStore } from "@reduxjs/toolkit";
import SnackBarReducer from "./snackbarSlice";

const Store = configureStore({
  reducer: {
    snackbar: SnackBarReducer,
  },
});

export type AppStore = typeof Store;

export default Store;
