import { GetServerSideProps } from "next";
import { userIsLogged } from "services/auth";
import { User, Jwt } from "types/user";
import { setUser } from "data/userSlice";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";
import useUpdateTraining from "helpers/trainingHooks/useUpdateTraing";
import Box from "@material-ui/core/Box";
import { DateT } from "data/dateSlice";
import TrainingExercise from "components/training/trainingExercise";
import Exercises from "components/modal/exercises";
import List from "@material-ui/core/List";
import ListItem, { ListItemProps } from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";

const useStyles = makeStyles((theme) => ({
  placeholder: {
    position: "absolute",
    left: "50%",
    top: "50%",
    transform: "translate(-50%,-50%)",
    textAlign: "center",
    "& img": {
      width: "60%",
      maxWidth: "250px",
    },
    "& h2": {
      color: "#636363",
      marginTop: "1rem",
      fontSize: "1.2rem",

      [theme.breakpoints.up("sm")]: {
        fontSize: "2rem",
      },
    },
  },
  date: {
    paddingTop: "1rem",
    margin: "0 auto",
    textAlign: "center",
    "& h1": {
      color: "#636363",
      letterSpacing: "5px",
      [theme.breakpoints.down("xs")]: {
        fontSize: "1.5rem",
      },
    },
  },
  container: {
    margin: "2rem auto ",
    maxWidth: 800,
  },
}));

const Home = ({ user }: User) => {
  const classes = useStyles();
  const dispatch = useDispatch();

  const {
    createTrainingComponent,
    getTrainings,
    date,
    getTodayTraining,
  } = useUpdateTraining();

  const todayTraining = getTodayTraining();

  useEffect(() => {
    const copyOfUser = {
      user: user,
    } as User;

    if (user?.trainings === null) {
      createTrainingComponent(user.id);
    } else dispatch(setUser(copyOfUser));
  }, []);

  useEffect(() => {
    if (user?.trainings)
      setTimeout(() => {
        getTrainings(user.trainings);
      }, 1000);
  }, [user?.trainings]);

  return (
    <>
      <Box className={classes.date}>
        <Box component="h1">{date}</Box>
      </Box>
      {todayTraining ? (
        <List className={classes.container} aria-label="main mailbox folders">
          {todayTraining.map((item) => (
            <TrainingExercise key={item.id} singleSet={item} />
          ))}
        </List>
      ) : (
        <Box className={classes.placeholder}>
          <img src="img/placeholder.png" alt="placeholder" />
          <Box component="h2">Add Exercises to training</Box>
        </Box>
      )}
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { user }: any = await userIsLogged(context);

  return {
    props: {
      user,
    },
  };
};

export default Home;
