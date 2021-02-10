import React from "react";

import { handleClose } from "data/modalSlice";
import { useSelector, useDispatch } from "react-redux";
import { ModalTypes, ModalTypeTypes } from "data/modalSlice";
import Dialog from "@material-ui/core/Dialog";
import Exercises from "./exercises/exercises";
import Routines from "./routines/routines";
import SingleRoutine from "./singleRoutine/singleRoutine";

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
        maxWidth={
          type === ModalTypeTypes.exercises
            ? "xs"
            : type === ModalTypeTypes.singleRoutine
            ? "sm"
            : "md"
        }
        onClose={() => dispatch(handleClose())}
        aria-labelledby="form-dialog-title"
      >
        {type === ModalTypeTypes.exercises ? (
          <Exercises />
        ) : type === ModalTypeTypes.routines ? (
          <Routines />
        ) : (
          <SingleRoutine />
        )}
      </Dialog>
    </section>
  );
};

export default ModalComponent;
