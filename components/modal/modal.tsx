import React from "react";

import { handleClose } from "data/modalSlice";
import { useSelector, useDispatch } from "react-redux";
import { ModalTypes, ModalTypeTypes } from "data/modalSlice";
import Dialog from "@material-ui/core/Dialog";
import Exercises from "./exercises/exercises";
import Routines from "./routines/routines";
import SingleRoutine from "./singleRoutine/singleRoutine";
import Profile from "./profile/profile";
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
    <Dialog
      open={isOpen}
      fullWidth={true}
      maxWidth={
        type === ModalTypeTypes.exercises || type === ModalTypeTypes.profile
          ? "xs"
          : type === ModalTypeTypes.singleRoutine
          ? "sm"
          : "md"
      }
      onClose={() => dispatch(handleClose())}
      aria-labelledby="form-dialog-title"
    >
      <section>
        {type === ModalTypeTypes.exercises ? (
          <Exercises />
        ) : type === ModalTypeTypes.routines ? (
          <Routines />
        ) : type === ModalTypeTypes.singleRoutine ? (
          <SingleRoutine />
        ) : (
          <Profile />
        )}
      </section>
    </Dialog>
  );
};

export default ModalComponent;
