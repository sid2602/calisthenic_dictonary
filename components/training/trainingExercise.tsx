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
import Button from "@material-ui/core/Button";
import AddIcon from "@material-ui/icons/Add";
import { openDialog, DialogType } from "data/dialogSlice";
import { useDispatch } from "react-redux";

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

      [theme.breakpoints.down("sm")]: {
        display: "flex",
        flexDirection: "column",
      },
    },

    series: {
      display: "flex",
      flexDirection: "column",
      padding: "0 0.4rem",
      "& span": {
        fontSize: "0.6rem",
        textAlgin: "center",
        width: "50px",
        [theme.breakpoints.down("sm")]: {
          margin: "1rem 0 0.4rem 0",
        },
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
    button: {
      background: "none",
      border: "none",
      color: "white",
      cursor: "pointer",
      outline: "none",
    },
  })
);

type Props = {
  singleSet: SingleSet;
};

type SeriesComponentProps = {
  quantity?: Quantity;
  index?: number;
  newSeries: boolean;
  variant?: VariantType;
  singleSetID?: number;
};
const SeriesComponent = ({
  quantity,
  index,
  newSeries,
  variant,
  singleSetID,
}: SeriesComponentProps) => {
  const dispatch = useDispatch();
  const classes = useStyles();
  const [message, setMessage] = useState("");

  useEffect(() => {
    if (quantity) {
      const kg = `${quantity.kg > 0 ? ` x ${quantity.kg}kg` : ""}`;

      if (quantity.variant === VariantType.rep) {
        setMessage(quantity.quantity + kg);
      } else if (quantity.variant === VariantType.seconds) {
        setMessage(quantity.quantity + "s " + kg);
      } else if (quantity.variant === VariantType.minutes) {
        setMessage(quantity.quantity + "m " + kg);
      } else if (quantity.variant === VariantType.minSec) {
        const minutes = Math.floor(quantity.quantity / 60);
        const seconds = quantity.quantity - minutes * 60;
        const convertedSeconds = seconds > 10 ? seconds : "0" + seconds;
        setMessage(minutes + "m :" + convertedSeconds + "s" + kg);
      }
    }
  }, []);

  return (
    <Box className={classes.series}>
      {newSeries ? (
        <>
          <Box component="span">new series </Box>
          <Box
            component="button"
            className={classes.button}
            onClick={() =>
              dispatch(
                openDialog({
                  type: DialogType.add_serie,
                  variant,
                  activeSingleSet: singleSetID,
                })
              )
            }
          >
            +
          </Box>
        </>
      ) : (
        <>
          <Box component="span">series {(index as number) + 1}</Box>
          <Box>{message}</Box>
        </>
      )}
    </Box>
  );
};

const TrainingExercise = ({ singleSet }: Props) => {
  const { name, variant } = singleSet.exercise;
  const classes = useStyles();
  return (
    <ListItem className={classes.listItem}>
      <ListItemText
        primary={name}
        style={{ textAlign: "center", marginBottom: "1rem" }}
      />
      <Box className={classes.seriesContainer}>
        {singleSet.quantity.map((item, index) => (
          <SeriesComponent
            key={item.id}
            quantity={item}
            index={index}
            newSeries={false}
          />
        ))}
        {singleSet.quantity.length < 6 && (
          <SeriesComponent
            newSeries={true}
            variant={variant}
            singleSetID={singleSet.id}
          />
        )}
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
