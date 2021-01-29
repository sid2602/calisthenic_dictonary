import React from "react";
import Dialog from "@material-ui/core/Dialog";
import { useSelector, useDispatch } from "react-redux";
import { DialogT, handleClose, DialogType } from "data/dialogSlice";
import RoutineDialog from "./routineDialog/routineDialog";
import SeriesDialog from "./seriesDialog/seriesDialog";

const DialogComponent = () => {
  const dispatch = useDispatch();
  const DialogState = useSelector<DialogT, DialogT["dialog"]>(
    (state) => state.dialog
  );

  const { isOpen, type } = DialogState.dialog;

  return (
    <div>
      <Dialog
        open={isOpen}
        onClose={() => dispatch(handleClose())}
        aria-labelledby="form-dialog-title"
      >
        {type === DialogType.add_new_routine ||
        type === DialogType.edit_routine ? (
          <RoutineDialog type={type} />
        ) : (
          <SeriesDialog />
        )}
      </Dialog>
    </div>
  );
};

export default DialogComponent;
