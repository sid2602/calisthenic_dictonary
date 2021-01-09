import React from "react";

import { handleClose } from "data/modalSlice";
import { useSelector, useDispatch } from "react-redux";
import { ModalTypes, ModalTypeTypes } from "data/modalSlice";
import Dialog from "@material-ui/core/Dialog";
import Exercises from "./exercises";

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
    <div>
      <Dialog
        open={isOpen}
        onClose={() => dispatch(handleClose())}
        aria-labelledby="form-dialog-title"
      >
        <Exercises />
      </Dialog>
    </div>
  );
};

export default ModalComponent;
