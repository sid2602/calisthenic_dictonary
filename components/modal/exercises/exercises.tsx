import React, { useEffect, useState } from "react";
import { parseCookies } from "nookies";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import Button from "@material-ui/core/Button";
import List from "@material-ui/core/List";
import {
  makeStyles,
  createStyles,
  Theme,
  CircularProgress,
} from "@material-ui/core";
import { handleClose, ModalT } from "data/modalSlice";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { ExercisesMuscleGroups } from "types/exercises";
import ExercisesList from "./exerciseslList";
import useSelectExercise from "helpers/modalHooks/useSelectExercise";
import useUpdateRoutines from "helpers/modalHooks/useUpdateRoutines";
import useUpdateTraining from "helpers/trainingHooks/useUpdateTraing";
const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: "300px",
      backgroundColor: theme.palette.background.paper,
      margin: "0 auto",
      [theme.breakpoints.down("xs")]: {
        width: "100%",
      },
    },

    nested: {
      paddingLeft: theme.spacing(4),
    },
  })
);

const Exercises = () => {
  const classes = useStyles();

  const ModalState = useSelector<ModalT, ModalT["modal"]>(
    (state) => state.modal
  );

  const {
    addExerciseToRoutineFlag,
    addExerciseToTrainingFlag,
  } = ModalState.modal;

  const [exercisesGroups, setExercisesGroups] = useState<
    ExercisesMuscleGroups[] | null
  >([]);

  const { selectExercise, selectedExercises } = useSelectExercise(false, []);
  const dispatch = useDispatch();
  const api_url = process.env.API_URL;
  const { addExercisesToRoutine } = useUpdateRoutines();
  const { addExercisesToTraining } = useUpdateTraining();

  const onClickAddButton = () => {
    if (addExerciseToRoutineFlag) {
      addExercisesToRoutine(selectedExercises);
    } else if (addExerciseToTrainingFlag || !addExerciseToRoutineFlag) {
      addExercisesToTraining(selectedExercises);
    }
  };

  useEffect(() => {
    const getExercises = async () => {
      try {
        const { jwt } = parseCookies();

        const { data } = await axios(`${api_url}exercises-muscle-groups`, {
          headers: {
            Authorization: `Bearer ${jwt}`,
          },
        });
        setExercisesGroups(data);
      } catch (e) {
        setExercisesGroups(null);
      }
    };
    getExercises();
  }, []);

  return (
    <>
      <header>
        <DialogTitle id="form-dialog-title">Exercises</DialogTitle>
      </header>
      <section>
        <DialogContent>
          <List className={classes.root}>
            {exercisesGroups!.length > 0 ? (
              <>
                {exercisesGroups?.map((item) => (
                  <ExercisesList
                    item={item}
                    key={item.id}
                    selectedExercises={selectedExercises}
                    selectExercise={selectExercise}
                  />
                ))}
              </>
            ) : (
              <CircularProgress size={50} />
            )}
          </List>
        </DialogContent>
      </section>
      <footer>
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
      </footer>
    </>
  );
};

export default Exercises;
