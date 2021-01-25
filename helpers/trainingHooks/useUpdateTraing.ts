import { useDispatch, useSelector } from "react-redux";
import { UserSlice, User } from "types/user";
import { parseCookies } from "nookies";
import axios from "axios";
import { setUser } from "data/userSlice";
import { DateT } from "data/dateSlice";
import { openSnackbar, SnackbarType } from "data/snackbarSlice";
import { setTraining, TrainingT } from "data/trainingSlice";
import { Exercise } from "types/exercises";
import { Training } from "types/training";
import { Routine } from "types/routine";
import { handleClose } from "data/modalSlice";
const useUpdateTraining = () => {
  const trainingState = useSelector<TrainingT, TrainingT["training"]>(
    (state) => state.training
  );
  const userState = useSelector<UserSlice, UserSlice["user"]>(
    (state) => state.user
  );
  const DateState = useSelector<DateT, DateT["date"]>((state) => state.date);

  const { user } = userState;
  const { date } = DateState.date;
  const { training } = trainingState.training;

  const dispatch = useDispatch();

  const api_url = process.env.API_URL;

  const createTrainingComponent = async (userId: number) => {
    try {
      const { jwt } = parseCookies();
      const body = {
        user: userId,
      };

      const { data } = await axios.post(`${api_url}trainings`, body, {
        headers: {
          Authorization: `Bearer ${jwt}`,
        },
      });

      dispatch(setUser({ user: data.user }));
    } catch (e) {
      dispatch(
        openSnackbar({
          message: "Can't create training component",
          type: SnackbarType.error,
        })
      );
    }
  };

  const getTrainings = async (trainingId: number) => {
    try {
      const { jwt } = parseCookies();

      const { data } = await axios.get(`${api_url}trainings/${trainingId}`, {
        headers: { Authorization: `Bearer ${jwt}` },
      });

      dispatch(setTraining({ training: data.training }));
    } catch (e) {
      dispatch(
        openSnackbar({
          message: "Can't get trainings",
          type: SnackbarType.error,
        })
      );
    }
  };

  const putRequest = async (newTrainings: Training[]) => {
    const { jwt } = parseCookies();

    const headers = {
      Authorization: `Bearer ${jwt}`,
    };

    const { data } = await axios.put(
      `${api_url}trainings/${userState.user?.trainings}`,
      {
        training: newTrainings,
      },
      {
        headers,
      }
    );

    return data.training;
  };

  const addExercisesToTraining = async (selectedExercises: Exercise[]) => {
    try {
      const indexOfTraining = training
        .map((item) => item.date)
        .indexOf(date as string);

      let copyOfTraining;

      if (indexOfTraining === -1) {
        copyOfTraining = {
          date: date as string,
          Exercises: {
            exercises: [],
          },
        };
      } else {
        copyOfTraining = training[indexOfTraining];
      }
      const copyOfSingleTraining = {
        ...copyOfTraining,
        Exercises: {
          exercises: [
            ...copyOfTraining.Exercises.exercises,
            ...selectedExercises,
          ],
        },
      };

      let newTrainings;

      if (indexOfTraining > -1)
        newTrainings = training.map((item, index) =>
          index === indexOfTraining ? copyOfSingleTraining : item
        );
      else newTrainings = [...training, copyOfSingleTraining];

      const response = await putRequest(newTrainings);

      dispatch(setTraining({ training: response }));
      dispatch(
        openSnackbar({
          message: "Successfully added exercises to training",
          type: SnackbarType.success,
        })
      );
      dispatch(handleClose());
    } catch (error) {
      dispatch(
        openSnackbar({
          message: "Can't update training",
          type: SnackbarType.error,
        })
      );
      dispatch(handleClose());
    }
  };

  return {
    createTrainingComponent,
    getTrainings,
    addExercisesToTraining,
    date,
  };
};

export default useUpdateTraining;
