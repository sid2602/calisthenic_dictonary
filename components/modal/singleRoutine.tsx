import { useSelector, useDispatch } from "react-redux";

import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import Button from "@material-ui/core/Button";

import {
  makeStyles,
  createStyles,
  Theme,
  Box,
  IconButton,
} from "@material-ui/core";
import Typography from "@material-ui/core/Typography";

import {
  openModal,
  ModalTypeTypes,
  ModalT,
  handleClose,
  setFlags,
} from "data/modalSlice";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import SingleRoutineList from "./singleRoutineList";

import useSelectExercise from "helpers/modalHooks/useSelectExercise";
import useUpdateTraining from "helpers/trainingHooks/useUpdateTraing";

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

  const {
    routines,
    activeRoutine,
    addRoutineToTrainingFlag,
    addExerciseToRoutineFlag,
  } = ModalState.modal;

  const { selectExercise, selectedExercises } = useSelectExercise(
    true,
    routines !== null && activeRoutine !== null
      ? routines[activeRoutine].Exercises.exercises
      : []
  );

  const { addExercisesToTraining } = useUpdateTraining();

  const onClickAddButton = () => {
    if (addRoutineToTrainingFlag || addExerciseToRoutineFlag === false) {
      addExercisesToTraining(selectedExercises);
    }
  };

  return (
    <>
      {routines !== null && activeRoutine !== null ? (
        <>
          <DialogTitle id="form-dialog-title">
            <Box className={classes.spaceBetween}>
              <Box className={classes.flex}>
                <IconButton
                  aria-controls="fade-menu"
                  aria-label="settings"
                  onClick={() =>
                    dispatch(openModal({ type: ModalTypeTypes.routines }))
                  }
                >
                  <ArrowBackIcon />
                </IconButton>
                <Typography>{routines[activeRoutine].name}</Typography>
              </Box>
              <Button
                color="secondary"
                onClick={() =>
                  dispatch(setFlags({ addExerciseToRoutineFlag: true }))
                }
              >
                Add exercise to routine
              </Button>
            </Box>
          </DialogTitle>
          <DialogContent className={classes.root}>
            {routines[activeRoutine]?.Exercises.exercises.map((exercise) => (
              <SingleRoutineList
                key={exercise.id + exercise.name}
                exercise={exercise}
                selectedExercises={selectedExercises}
                selectExercise={selectExercise}
              />
            ))}
          </DialogContent>
          <DialogActions>
            <Button color="primary" onClick={() => dispatch(handleClose())}>
              Cancel
            </Button>
            {selectedExercises.length > 0 && (
              <Button color="secondary" onClick={onClickAddButton}>
                Add
              </Button>
            )}
          </DialogActions>
        </>
      ) : null}
    </>
  );
};

export default SingleRoutine;
