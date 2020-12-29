import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert, { AlertProps } from "@material-ui/lab/Alert";
import React from "react";
import { handleClick, handleClose } from "data/snackbarSlice";
import { useSelector, useDispatch } from "react-redux";
import { SnackBarTypes } from "data/snackbarSlice";
import { AppStore } from "data/store";

function Alert(props: AlertProps) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

type SnackBar = {
  snackbar: SnackBarTypes;
};

const SnackBarComponent = () => {
  const SnackBarState = useSelector<SnackBar, SnackBar["snackbar"]>(
    (state) => state.snackbar
  );

  const { isOpen, type, message } = SnackBarState.snackbar;
  const dispatch = useDispatch();

  return (
    <Snackbar
      open={isOpen}
      autoHideDuration={6000}
      onClose={() => dispatch(handleClose())}
      anchorOrigin={{ vertical: "top", horizontal: "center" }}
    >
      <Alert onClose={() => dispatch(handleClose())} severity={type}>
        {message}
      </Alert>
    </Snackbar>
  );
};

export default SnackBarComponent;
