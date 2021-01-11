import React, { useEffect, useState } from "react";
import { parseCookies } from "nookies";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import Button from "@material-ui/core/Button";
import List from "@material-ui/core/List";
import { makeStyles, createStyles, Theme, Box } from "@material-ui/core";
import { handleClose } from "data/modalSlice";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardContent from "@material-ui/core/CardContent";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import Grid from "@material-ui/core/Grid";
import { UserSlice } from "types/user";
import { Routine } from "types/routine";
const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      backgroundColor: theme.palette.background.paper,
    },
    spaceBetween: {
      display: "flex",
      justifyContent: "space-between",
    },
    typography: {
      textAlign: "center",
    },
    paddingBottom: {
      paddingBottom: "2.5rem",
    },
    card: {
      maxWidth: "200px",
    },
  })
);

const Routines = () => {
  const classes = useStyles();
  const [routines, setRoutines] = useState<Routine[] | null>([]);
  const dispatch = useDispatch();
  const api_url = process.env.API_URL;

  const userState = useSelector<UserSlice, UserSlice["user"]>(
    (state) => state.user
  );

  console.log(routines);

  useEffect(() => {
    const getExercises = async () => {
      try {
        const { jwt } = parseCookies();

        const { data } = await axios(
          `${api_url}routines/${userState.user?.routine}`,
          {
            headers: {
              Authorization: `Bearer ${jwt}`,
            },
          }
        );

        const { Routine } = data;

        setRoutines(Routine);
      } catch (e) {
        setRoutines(null);
      }
    };
    getExercises();
  }, []);

  return (
    <>
      {console.log(routines)}
      <DialogTitle id="form-dialog-title">
        <Box className={classes.spaceBetween}>
          <Typography>Routines</Typography>
          <Button color="secondary">Add new routine</Button>
        </Box>
      </DialogTitle>
      <DialogContent className={classes.root}>
        <Grid
          container
          direction="row"
          justify="space-evenly"
          alignItems="center"
          spacing={2}
        >
          {routines!.length > 0 &&
            routines!.map((routine) => (
              <Grid
                item
                xs={12}
                sm={5}
                className={classes.card}
                key={routine.name + routine.id}
              >
                <Card>
                  <CardHeader
                    action={
                      <IconButton aria-label="settings">
                        <MoreVertIcon />
                      </IconButton>
                    }
                  />
                  <CardContent>
                    <Typography
                      gutterBottom
                      variant="h5"
                      component="h2"
                      className={classes.typography}
                    >
                      {routine.name}
                    </Typography>
                  </CardContent>
                  <Box className={classes.paddingBottom} />
                </Card>
              </Grid>
            ))}
        </Grid>
      </DialogContent>
      <DialogActions>
        <Button color="primary" onClick={() => dispatch(handleClose())}>
          Cancel
        </Button>
      </DialogActions>
    </>
  );
};

export default Routines;
