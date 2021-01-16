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

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    listItem: {
      // background: theme.palette.action.selected,
      borderRadius: "5px",
    },
  })
);

type Props = {
  exercise: Exercise;
  selectedExercises: number[];
  selectExercise: (exerciseid: number) => void;
  deleteExercise: (exerciseid: number) => void;
};

const SingleRoutineList = ({
  exercise,
  selectedExercises,
  deleteExercise,
  selectExercise,
}: Props) => {
  const classes = useStyles();

  return (
    <>
      <List aria-label="main mailbox folders">
        <ListItem
          button
          className={classes.listItem}
          onClick={() => selectExercise(exercise.id)}
          selected={selectedExercises.indexOf(exercise.id) > -1}
        >
          <ListItemText primary={exercise.name} />
          <ListItemSecondaryAction>
            <IconButton
              edge="end"
              aria-label="delete"
              onClick={() => deleteExercise(exercise.id)}
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
