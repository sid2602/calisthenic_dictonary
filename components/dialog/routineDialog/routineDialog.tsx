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
import { openDialog, DialogType } from "data/dialogSlice";

type Props = {
  type: DialogType;
};

const RoutineDialog = ({ type }: Props) => {
  const dispatch = useDispatch();
  const { addNewRoutine, editRoutine } = useUpdateRoutines();
  const textInput = useRef<HTMLInputElement>(null);

  const onInputClick = () => {
    const { current } = textInput;

    if (current) {
      type === DialogType.add_new_routine && addNewRoutine(current.value);
      type === DialogType.edit_routine && editRoutine(current.value);
    }
  };

  const checkIsNewRoutine = () => type === DialogType.add_new_routine;

  return (
    <>
      <DialogTitle id="form-dialog-title">
        {checkIsNewRoutine() ? "Add new routine" : "Edit routine name"}
      </DialogTitle>
      <DialogContent>
        <DialogContentText>
          {checkIsNewRoutine()
            ? "Add a name for the new routine"
            : "Add a name to edit routine"}
        </DialogContentText>
        <TextField
          autoFocus
          margin="dense"
          id="name"
          label={checkIsNewRoutine() ? "New routine" : "Edit routine"}
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
          {checkIsNewRoutine() ? "Add new routine" : "Edit routine"}
        </Button>
      </DialogActions>
    </>
  );
};

export default RoutineDialog;
