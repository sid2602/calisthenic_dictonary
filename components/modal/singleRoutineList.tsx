import { Exercise } from "types/exercises";

import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";

import ListItemText from "@material-ui/core/ListItemText";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import {
  makeStyles,
  createStyles,
  Theme,
  Box,
  IconButton,
} from "@material-ui/core";

import DeleteIcon from "@material-ui/icons/Delete";
import useUpdateRoutines from "helpers/modalHooks/useUpdateRoutines";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    listItem: {
      borderRadius: "5px",
    },
  })
);

type Props = {
  exercise: Exercise;
  selectedExercises: Exercise[];
  selectExercise: (exercise: Exercise) => void;
};

const SingleRoutineList = ({
  exercise,
  selectedExercises,

  selectExercise,
}: Props) => {
  const classes = useStyles();

  const { removeExercise } = useUpdateRoutines();

  return (
    <>
      <List aria-label="main mailbox folders">
        <ListItem
          button
          className={classes.listItem}
          onClick={() => selectExercise(exercise)}
          selected={
            selectedExercises.map((item) => item.id).indexOf(exercise.id) > -1
          }
        >
          <ListItemText primary={exercise.name} />
          <ListItemSecondaryAction>
            <IconButton
              edge="end"
              aria-label="delete"
              onClick={() => removeExercise(exercise.id)}
            >
              <DeleteIcon />
            </IconButton>
          </ListItemSecondaryAction>
        </ListItem>
      </List>
    </>
  );
};

export default SingleRoutineList;
