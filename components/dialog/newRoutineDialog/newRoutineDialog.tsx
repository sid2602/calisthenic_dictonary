import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import { useDispatch } from "react-redux";
import { handleClose } from "data/dialogSlice";
import useUpdateRoutines from "helpers/modalHooks/useUpdateRoutines";
import { useRef } from "react";

const NewRoutineDialog = () => {
  const dispatch = useDispatch();
  const { addNewRoutine } = useUpdateRoutines();
  const textInput = useRef<HTMLInputElement>(null);

  const onInputClick = () => {
    const { current } = textInput;

    if (current && current.value !== "") addNewRoutine(current.value);
  };

  return (
    <>
      <DialogTitle id="form-dialog-title">New routine</DialogTitle>
      <DialogContent>
        <DialogContentText>Add a name for the new routine</DialogContentText>
        <TextField
          autoFocus
          margin="dense"
          id="name"
          label="New routine"
          type="text"
          fullWidth
          inputRef={textInput}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={() => dispatch(handleClose())} color="primary">
          Cancel
        </Button>
        <Button onClick={onInputClick} color="secondary">
          Add new routine
        </Button>
      </DialogActions>
    </>
  );
};

export default NewRoutineDialog;
