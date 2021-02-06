import { Exercise, VariantType } from "types/exercises";
import { createStyles, Theme, makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem, { ListItemProps } from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import { ListItemSecondaryAction, IconButton } from "@material-ui/core";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import Box from "@material-ui/core/Box";
import { SingleSet, Quantity } from "types/training";
import { useState, useEffect } from "react";

import { openDialog, DialogType } from "data/dialogSlice";
import { useDispatch } from "react-redux";
import SeriesComponent from "./seriesComponent";
import MenuComponent from "components/menu";
import useUpdateTraining from "helpers/trainingHooks/useUpdateTraing";
const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    listItem: {
      backgroundColor: theme.palette.background.paper,
      borderRadius: "5px",
      padding: "1rem 2rem",
      margin: "1rem 0",

      [theme.breakpoints.down("sm")]: {
        display: "flex",
        flexDirection: "column",
      },
    },
    listItemText: {
      fontSize: "2rem",
      display: "block",
      width: "200px",
      [theme.breakpoints.down("sm")]: {
        textAlign: "center",
        // marginBottom: "1rem",
      },
    },
    seriesContainer: {
      marginLeft: "2rem",
      display: "flex",

      width: "80%",
      [theme.breakpoints.down("sm")]: {
        width: "100%",
        flexWrap: "wrap",
      },
    },
  })
);

type Props = {
  singleSet: SingleSet;
};

const TrainingExercise = ({ singleSet }: Props) => {
  const { name, variant } = singleSet.exercise;
  const classes = useStyles();
  const dispatch = useDispatch();
  const { removeExerciseFromTraining } = useUpdateTraining();

  const editButtonClick = () => {};

  const removeButtonClick = () => {
    removeExerciseFromTraining(singleSet.id as number);
  };

  return (
    <ListItem className={classes.listItem}>
      <ListItemText primary={name} className={classes.listItemText} />
      <Box className={classes.seriesContainer}>
        {singleSet.quantity.map((item, index) => (
          <SeriesComponent
            key={item.id}
            quantity={item}
            index={index}
            newSeries={false}
          />
        ))}
        {singleSet.quantity.length < 8 && (
          <SeriesComponent
            newSeries={true}
            variant={variant}
            singleSetID={singleSet.id}
          />
        )}
      </Box>
      <ListItemSecondaryAction>
        <MenuComponent
          editButtonClick={editButtonClick}
          removeButtonClick={removeButtonClick}
        />
      </ListItemSecondaryAction>
    </ListItem>
  );
};

export default TrainingExercise;
