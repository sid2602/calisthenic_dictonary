import { configureStore } from "@reduxjs/toolkit";
import SnackBarReducer from "./snackbarSlice";
import ModalReducer from "./modalSlice";
import UserReducer from "./userSlice";
import DialogReducer from "./dialogSlice";
import DateReducer from "./dateSlice";
import TrainingReducer from "./trainingSlice";
import LoaderReducer from "./loaderSlice";
const Store = configureStore({
  reducer: {
    snackbar: SnackBarReducer,
    modal: ModalReducer,
    user: UserReducer,
    dialog: DialogReducer,
    date: DateReducer,
    training: TrainingReducer,
    loader: LoaderReducer,
  },
});

export type AppStore = typeof Store;

export default Store;
