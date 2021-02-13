import {
  DialogTitle,
  DialogActions,
  Button,
  makeStyles,
  Theme,
  createStyles,
  InputAdornment,
  FormControl,
  OutlinedInput,
  Box,
} from "@material-ui/core";
import { handleClose, DialogT } from "data/dialogSlice";
import { useDispatch, useSelector } from "react-redux";
import React from "react";
import useUpdateTraining from "helpers/trainingHooks/useUpdateTraing";
import { VariantType } from "types/exercises";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    section: {
      display: "flex",
      flexDirection: "column",
    },

    dialogTitle: {
      textAlign: "center",
    },

    inputContainer: {
      margin: "0 auto",
    },

    repKgLabel: {
      width: "250px",
      margin: "1rem ",
      [theme.breakpoints.down("sm")]: {
        width: "200px",
      },
    },

    timeLabel: {
      width: "100px",
      margin: "1rem",

      [theme.breakpoints.down("sm")]: {
        width: "80px",
        fontSize: "0.8rem",
        "& p": {
          fontSize: "0.7rem",
        },
      },
    },
  })
);

export type State = {
  kg: string;
  minutes: string;
  seconds: string;
  rep: string;
};

const SeriesDialog = () => {
  const classes = useStyles();
  const dispatch = useDispatch();

  const DialogState = useSelector<DialogT, DialogT["dialog"]>(
    (state) => state.dialog
  );

  const { exerciseVariant, title, activeSeries } = DialogState.dialog;

  const [values, setValues] = React.useState<State>({
    kg: "",
    seconds: "",
    minutes: "",
    rep: "",
  });

  const { actionOnSeries, removeSeries } = useUpdateTraining();

  const handleAddBtnClick = () => {
    actionOnSeries(values, activeSeries);
  };

  const handleChange = (prop: keyof State) => (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setValues({ ...values, [prop]: event.target.value });
  };

  return (
    <Box component="section">
      <header>
        <DialogTitle id="form-dialog-title" className={classes.dialogTitle}>
          {title}
        </DialogTitle>
      </header>
      <section className={classes.section}>
        {exerciseVariant !== VariantType.rep ? (
          <Box className={classes.inputContainer}>
            <FormControl>
              <OutlinedInput
                className={classes.timeLabel}
                id="outlined-adornment-minutes"
                value={values.minutes}
                onChange={handleChange("minutes")}
                startAdornment={
                  <InputAdornment position="start">MIN</InputAdornment>
                }
                aria-describedby="outlined-minutes-helper-text"
                inputProps={{
                  "aria-label": "minutes",
                }}
                labelWidth={0}
              />
            </FormControl>

            <FormControl>
              <OutlinedInput
                className={classes.timeLabel}
                id="outlined-adornment-seconds"
                value={values.seconds}
                onChange={handleChange("seconds")}
                startAdornment={
                  <InputAdornment position="start">SEC</InputAdornment>
                }
                aria-describedby="outlined-seconds-helper-text"
                inputProps={{
                  "aria-label": "seconds",
                }}
                labelWidth={0}
              />
            </FormControl>
          </Box>
        ) : (
          <FormControl>
            <OutlinedInput
              className={classes.repKgLabel}
              id="outlined-adornment-rep"
              value={values.rep}
              onChange={handleChange("rep")}
              startAdornment={
                <InputAdornment position="start">Rep</InputAdornment>
              }
              aria-describedby="outlined-rep-helper-text"
              inputProps={{
                "aria-label": "rep",
              }}
              labelWidth={0}
            />
          </FormControl>
        )}

        <FormControl>
          <OutlinedInput
            className={classes.repKgLabel}
            id="outlined-adornment-weight"
            value={values.kg}
            onChange={handleChange("kg")}
            startAdornment={
              <InputAdornment position="start">KG</InputAdornment>
            }
            aria-describedby="outlined-kg-helper-text"
            inputProps={{
              "aria-label": "kg",
            }}
            labelWidth={0}
          />
        </FormControl>
      </section>
      <footer>
        <DialogActions>
          {activeSeries > -1 && (
            <Button onClick={() => removeSeries(activeSeries)}>Remove</Button>
          )}
          <Button onClick={() => dispatch(handleClose())} color="primary">
            Cancel
          </Button>
          <Button color="secondary" onClick={handleAddBtnClick}>
            Add
          </Button>
        </DialogActions>
      </footer>
    </Box>
  );
};

export default SeriesDialog;
