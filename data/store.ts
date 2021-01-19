import { configureStore } from "@reduxjs/toolkit";
import SnackBarReducer from "./snackbarSlice";
import ModalReducer from "./modalSlice";
import UserReducer from "./userSlice";
import DialogReducer from "./dialogSlice";
const Store = configureStore({
  reducer: {
    snackbar: SnackBarReducer,
    modal: ModalReducer,
    user: UserReducer,
    dialog: DialogReducer,
  },
});

export type AppStore = typeof Store;

export default Store;
