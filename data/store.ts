import { configureStore } from "@reduxjs/toolkit";
import SnackBarReducer from "./snackbarSlice";
import ModalReducer from "./modalSlice";
const Store = configureStore({
  reducer: {
    snackbar: SnackBarReducer,
    modal: ModalReducer,
  },
});

export type AppStore = typeof Store;

export default Store;
