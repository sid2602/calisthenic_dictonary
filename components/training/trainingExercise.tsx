import { createStyles, Theme, makeStyles } from "@material-ui/core/styles";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import { ListItemSecondaryAction, IconButton } from "@material-ui/core";
import Box from "@material-ui/core/Box";
import { SingleSet } from "types/training";
import SeriesComponent from "./seriesComponent";
import useUpdateTraining from "helpers/trainingHooks/useUpdateTraing";
import DeleteIcon from "@material-ui/icons/Delete";
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
  const { removeExerciseFromTraining } = useUpdateTraining();

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
            singleSetID={singleSet.id}
            variant={variant}
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
        <IconButton onClick={removeButtonClick}>
          <DeleteIcon />
        </IconButton>
      </ListItemSecondaryAction>
    </ListItem>
  );
};

export default TrainingExercise;
