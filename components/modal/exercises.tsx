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
import { handleClose } from "data/modalSlice";
import { useDispatch } from "react-redux";
import axios from "axios";
import { ExercisesMuscleGroups } from "types/exercises";
import ExercisesList from "./exerciseslList";
const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: "300px",
      backgroundColor: theme.palette.background.paper,
      margin: "0 auto",
      [theme.breakpoints.down("xs")]: {
        width: "250px",
      },
    },

    nested: {
      paddingLeft: theme.spacing(4),
    },
  })
);

const Exercises = () => {
  const classes = useStyles();
  const [exercisesGroups, setExercisesGroups] = useState<
    ExercisesMuscleGroups[] | null
  >([]);
  const [selectedExercises, setSelectedExercises] = useState<number | null>(
    null
  );
  const dispatch = useDispatch();
  const api_url = process.env.API_URL;

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
      <DialogTitle id="form-dialog-title">Exercises</DialogTitle>
      <DialogContent>
        <List className={classes.root}>
          {exercisesGroups!.length > 0 ? (
            <>
              {exercisesGroups?.map((item) => (
                <ExercisesList
                  item={item}
                  key={item.id}
                  setSelectedExercises={setSelectedExercises}
                  selectedExercises={selectedExercises}
                />
              ))}
            </>
          ) : (
            <CircularProgress size={50} />
          )}
        </List>
      </DialogContent>
      <DialogActions>
        <Button color="primary" onClick={() => dispatch(handleClose())}>
          Cancel
        </Button>
        {selectedExercises !== null && <Button color="secondary">Add</Button>}
      </DialogActions>
    </>
  );
};

export default Exercises;
