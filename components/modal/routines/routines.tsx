import React, { useEffect, useState } from "react";
import { parseCookies } from "nookies";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import Button from "@material-ui/core/Button";

import {
  makeStyles,
  createStyles,
  Theme,
  Box,
  CircularProgress,
} from "@material-ui/core";
import { handleClose, ModalT } from "data/modalSlice";
import { useDispatch, useSelector } from "react-redux";

import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";

import RoutinesList from "./routinesList";

import useUpdateRoutines from "helpers/modalHooks/useUpdateRoutines";
import { openDialog, DialogType } from "data/dialogSlice";
const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      backgroundColor: theme.palette.background.paper,
      minHeight: "200px",
    },

    spaceBetween: {
      display: "flex",
      justifyContent: "space-between",
    },

    grid: {
      maxWidth: "200px",
    },
  })
);

const Routines = () => {
  const classes = useStyles();

  const dispatch = useDispatch();

  const { getRoutines } = useUpdateRoutines();

  const modalState = useSelector<ModalT, ModalT["modal"]>(
    (state) => state.modal
  );

  const { routines } = modalState.modal;

  useEffect(() => {
    getRoutines();
  }, []);

  return (
    <>
      <header>
        <DialogTitle id="form-dialog-title">
          <Box className={classes.spaceBetween}>
            <Typography>Routines</Typography>

            <Button
              color="secondary"
              onClick={() =>
                dispatch(openDialog({ type: DialogType.add_new_routine }))
              }
            >
              Add new routine
            </Button>
          </Box>
        </DialogTitle>
      </header>
      <section>
        <DialogContent className={classes.root}>
          <Grid
            container
            direction="row"
            justify="space-evenly"
            alignItems="center"
            spacing={2}
          >
            {routines !== null ? (
              routines.length > 0 ? (
                routines?.map((routine) => (
                  <RoutinesList
                    routine={routine}
                    key={routine.name + routine.id}
                  />
                ))
              ) : (
                <h2>There is no routine</h2>
              )
            ) : (
              <CircularProgress size={50} />
            )}
          </Grid>
        </DialogContent>
      </section>
      <footer>
        <DialogActions>
          <Button color="primary" onClick={() => dispatch(handleClose())}>
            Cancel
          </Button>
        </DialogActions>
      </footer>
    </>
  );
};

export default Routines;
