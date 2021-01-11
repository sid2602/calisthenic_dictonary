import { configureStore } from "@reduxjs/toolkit";
import SnackBarReducer from "./snackbarSlice";
import ModalReducer from "./modalSlice";
import UserReducer from "./userSlice";

const Store = configureStore({
  reducer: {
    snackbar: SnackBarReducer,
    modal: ModalReducer,
    user: UserReducer,
  },
});

export type AppStore = typeof Store;

export default Store;
