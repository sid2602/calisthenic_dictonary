import {
  DialogTitle,
  DialogContent,
  DialogContentText,
  TextField,
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
    dialogTitle: {
      textAlign: "center",
    },

    inputContainer: {
      margin: "0 auto",
    },

    repKgLabel: {
      width: "250px",
      margin: "1rem",
    },

    timeLabel: {
      width: "100px",
      margin: "1rem",
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

  const { exerciseVariant } = DialogState.dialog;

  const [values, setValues] = React.useState<State>({
    kg: "",
    seconds: "",
    minutes: "",
    rep: "",
  });

  const { addSeries } = useUpdateTraining();

  const handleChange = (prop: keyof State) => (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setValues({ ...values, [prop]: event.target.value });
  };
  return (
    <>
      <DialogTitle id="form-dialog-title" className={classes.dialogTitle}>
        New Series
      </DialogTitle>
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
          startAdornment={<InputAdornment position="start">KG</InputAdornment>}
          aria-describedby="outlined-kg-helper-text"
          inputProps={{
            "aria-label": "kg",
          }}
          labelWidth={0}
        />
      </FormControl>

      <DialogActions>
        <Button onClick={() => dispatch(handleClose())} color="primary">
          Cancel
        </Button>
        <Button color="secondary" onClick={() => addSeries(values)}>
          Add
        </Button>
      </DialogActions>
    </>
  );
};

export default SeriesDialog;
