import { useSelector, useDispatch } from "react-redux";
import { ModalTypes, handleClose } from "data/modalSlice";
import { useEffect, useState } from "react";
import { parseCookies } from "nookies";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import Button from "@material-ui/core/Button";

import {
  makeStyles,
  createStyles,
  Theme,
  Box,
  CircularProgress,
  IconButton,
} from "@material-ui/core";
import Typography from "@material-ui/core/Typography";

import { handleClick, ModalTypeTypes } from "data/modalSlice";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import SingleRoutineList from "./singleRoutineList";

type ModalT = {
  modal: ModalTypes;
};

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      backgroundColor: theme.palette.background.paper,
      minHeight: "200px",
    },

    spaceBetween: {
      display: "flex",
      justifyContent: "space-between",
    },

    flex: {
      display: "flex",
      alignItems: "center",

      "& > *": {
        margin: "0 1rem",
      },
    },
    listItem: {
      background: theme.palette.action.selected,
      borderRadius: "5px",
    },
  })
);

const SingleRoutine = () => {
  const ModalState = useSelector<ModalT, ModalT["modal"]>(
    (state) => state.modal
  );
  const dispatch = useDispatch();
  const classes = useStyles();
  const { routine } = ModalState.modal;

  return (
    <>
      <DialogTitle id="form-dialog-title">
        <Box className={classes.spaceBetween}>
          <Box className={classes.flex}>
            <IconButton
              aria-controls="fade-menu"
              aria-label="settings"
              onClick={() =>
                dispatch(handleClick({ type: ModalTypeTypes.routines }))
              }
            >
              <ArrowBackIcon />
            </IconButton>
            <Typography>{routine!.name}</Typography>
          </Box>
          <Button color="secondary">Add exercise to routine</Button>
        </Box>
      </DialogTitle>
      <DialogContent className={classes.root}>
        {routine?.Exercises.exercises.map((exercise) => (
          <SingleRoutineList
            key={exercise.id + exercise.name}
            exercise={exercise}
          />
        ))}
      </DialogContent>
      <DialogActions>
        <Button color="primary" onClick={() => dispatch(handleClose())}>
          Cancel
        </Button>
      </DialogActions>
    </>
  );
};

export default SingleRoutine;
