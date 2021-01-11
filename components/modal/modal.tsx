import React from "react";

import { handleClose } from "data/modalSlice";
import { useSelector, useDispatch } from "react-redux";
import { ModalTypes, ModalTypeTypes } from "data/modalSlice";
import Dialog from "@material-ui/core/Dialog";
import Exercises from "./exercises";
import Routines from "./routines";
type ModalT = {
  modal: ModalTypes;
};

const ModalComponent = () => {
  const ModalState = useSelector<ModalT, ModalT["modal"]>(
    (state) => state.modal
  );
  const dispatch = useDispatch();

  const { isOpen, type } = ModalState.modal;

  return (
    <section>
      <Dialog
        open={isOpen}
        fullWidth={true}
        maxWidth={type === ModalTypeTypes.exercises ? "xs" : "md"}
        onClose={() => dispatch(handleClose())}
        aria-labelledby="form-dialog-title"
      >
        {type !== ModalTypeTypes.exercises ? <Routines /> : <Exercises />}
      </Dialog>
    </section>
  );
};

export default ModalComponent;
