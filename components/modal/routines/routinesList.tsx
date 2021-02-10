import { Routine } from "types/routine";
import {
  CardActions,
  makeStyles,
  createStyles,
  Theme,
} from "@material-ui/core";
import { setActiveRoutine } from "data/modalSlice";
import Card from "@material-ui/core/Card";
import { useDispatch } from "react-redux";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import useUpdateRoutines from "helpers/modalHooks/useUpdateRoutines";
import { openDialog, DialogType } from "data/dialogSlice";
import { openModal, ModalTypeTypes } from "data/modalSlice";
import MenuComponent from "components/menu";
const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    card: {
      position: "relative",
      transition: "0.2s",
      "&:hover": {
        backgroundColor: theme.palette.action.hover,
      },
    },
    cardAction: {
      padding: "0",
      position: "absolute",
    },
    cardContent: {
      cursor: "pointer",
    },

    typography: {
      textAlign: "center",
      padding: "3rem 0 2.8rem",
    },

    grid: {
      maxWidth: "200px",
    },
  })
);

type Props = {
  routine: Routine;
};

const RoutinesList = ({ routine }: Props) => {
  const dispatch = useDispatch();
  const { removeRoutine } = useUpdateRoutines();

  const editButtonClick = () => {
    dispatch(setActiveRoutine({ activeRoutine: routine.id as number }));
    dispatch(openDialog({ type: DialogType.edit_routine }));
    dispatch(openModal({ type: ModalTypeTypes.routines }));
  };

  const removeButtonClick = () => {
    removeRoutine(routine.id as number);
  };

  const classes = useStyles();

  return (
    <Grid item xs={12} sm={5} className={classes.grid}>
      <Card className={classes.card}>
        <CardActions className={classes.cardAction}>
          <MenuComponent
            editButtonClick={editButtonClick}
            removeButtonClick={removeButtonClick}
          />
        </CardActions>

        <CardContent
          onClick={() =>
            dispatch(
              setActiveRoutine({ activeRoutine: routine.id as number | null })
            )
          }
          className={classes.cardContent}
        >
          <Typography
            variant="h5"
            component="h2"
            className={classes.typography}
          >
            {routine.name}
          </Typography>
        </CardContent>
      </Card>
    </Grid>
  );
};

export default RoutinesList;
