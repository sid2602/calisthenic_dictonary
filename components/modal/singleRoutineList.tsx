import { Exercise } from "types/exercises";
import { ModalTypes } from "data/modalSlice";

import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import {
  makeStyles,
  createStyles,
  Theme,
  Box,
  CircularProgress,
  IconButton,
} from "@material-ui/core";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import { handleClick, ModalTypeTypes } from "data/modalSlice";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import DeleteIcon from "@material-ui/icons/Delete";

type ModalT = {
  modal: ModalTypes;
};

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    listItem: {
      background: theme.palette.action.selected,
      borderRadius: "5px",
    },
  })
);

type Props = {
  exercise: Exercise;
};

const SingleRoutineList = ({ exercise }: Props) => {
  const classes = useStyles();

  return (
    <>
      <List aria-label="main mailbox folders">
        <ListItem button className={classes.listItem}>
          <ListItemText primary={exercise.name} />
          <ListItemSecondaryAction>
            <IconButton edge="end" aria-label="delete">
              <DeleteIcon />
            </IconButton>
          </ListItemSecondaryAction>
        </ListItem>
      </List>
    </>
  );
};

export default SingleRoutineList;
