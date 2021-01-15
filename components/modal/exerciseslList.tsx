import React from "react";

import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import { makeStyles, createStyles, Theme } from "@material-ui/core";
import ExpandLess from "@material-ui/icons/ExpandLess";
import ExpandMore from "@material-ui/icons/ExpandMore";
import Collapse from "@material-ui/core/Collapse";
import { ExercisesMuscleGroups } from "types/exercises";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    nested: {
      paddingLeft: theme.spacing(4),
    },
  })
);

type Props = {
  item: ExercisesMuscleGroups;
  selectedExercises: number[];
  selectExercise: (exerciseid: number) => void;
};

const ExercisesList = ({ item, selectedExercises, selectExercise }: Props) => {
  const [open, setOpen] = React.useState(false);
  const classes = useStyles();
  const handleClick = () => {
    setOpen(!open);
  };

  const api_url = process.env.API_URL;

  return (
    <div key={`${item.id}exercisesGroups`}>
      <ListItem button onClick={handleClick}>
        <ListItemIcon>
          <img
            style={{ width: "30px", color: "white" }}
            src={`${api_url}uploads/${item.icon.hash}.svg`}
          />
        </ListItemIcon>
        <ListItemText>{item.muscle_group}</ListItemText>
        {item.exercises.length > 0 ? (
          open ? (
            <ExpandLess />
          ) : (
            <ExpandMore />
          )
        ) : null}
      </ListItem>

      {item.exercises.length > 0 &&
        item.exercises.map((exercises) => (
          <Collapse
            in={open}
            timeout="auto"
            unmountOnExit
            key={`${exercises.id}exercises`}
          >
            <List component="div" disablePadding>
              <ListItem
                button
                className={classes.nested}
                onClick={() => selectExercise(exercises.id)}
                selected={selectedExercises.indexOf(exercises.id) > -1}
              >
                <ListItemText primary={exercises.name} />
              </ListItem>
            </List>
          </Collapse>
        ))}
    </div>
  );
};

export default ExercisesList;