import { Exercise } from "types/exercises";
import { createStyles, Theme, makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem, { ListItemProps } from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import { ListItemSecondaryAction, IconButton } from "@material-ui/core";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import Box from "@material-ui/core/Box";
import { SingleSet } from "types/training";
import { useState } from "react";
import Button from "@material-ui/core/Button";
import AddIcon from "@material-ui/icons/Add";
const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    listItem: {
      backgroundColor: theme.palette.background.paper,
      borderRadius: "5px",
      padding: "1rem 2rem",
      margin: "1rem 0",
      "& span": {
        fontSize: "1.2rem",
        display: "block",
        width: "200px",
      },
    },

    series: {
      display: "flex",
      flexDirection: "column",
      textAlign: "center",
      //   marginRight: "0.5rem",

      "& span": {
        fontSize: "0.6rem",
        // display: "inline",
        width: "50px",
        marginBottom: "0.3rem",
      },
    },
    seriesContainer: {
      marginLeft: "2rem",
      display: "flex",
      //   justifyContent: "center",
      width: "80%",
    },
    button: {
      background: "none",
      border: "none",
      color: "white",
      cursor: "hover",
      outline: "none",
    },
  })
);

type Props = {
  singleSet: SingleSet;
};

type SeriesComponentProps = {
  quantity?: string;
  index?: number;
  newSeries: boolean;
};
const SeriesComponent = ({
  quantity,
  index,
  newSeries,
}: SeriesComponentProps) => {
  const classes = useStyles();
  return (
    <Box className={classes.series}>
      {newSeries ? (
        <>
          <Box component="span">new series </Box>
          <Box component="button" className={classes.button}>
            +
          </Box>
        </>
      ) : (
        <>
          <Box component="span">series {(index as number) + 1}</Box>
          <Box>{quantity}</Box>
        </>
      )}
    </Box>
  );
};

const TrainingExercise = ({ singleSet }: Props) => {
  const classes = useStyles();
  return (
    <ListItem className={classes.listItem}>
      <ListItemText primary={singleSet.exercise.name} />
      <Box className={classes.seriesContainer}>
        {singleSet.quantity.map((item, index) => (
          <SeriesComponent
            key={item.id}
            quantity={item.quantity}
            index={index}
            newSeries={false}
          />
        ))}

        <SeriesComponent newSeries={true} />
      </Box>
      <ListItemSecondaryAction>
        <IconButton edge="end" aria-label="comments">
          <MoreVertIcon />
        </IconButton>
      </ListItemSecondaryAction>
    </ListItem>
  );
};

export default TrainingExercise;
