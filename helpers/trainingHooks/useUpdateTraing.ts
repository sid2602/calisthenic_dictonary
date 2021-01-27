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
  const { trainings } = trainingState.training;

  const getTodayTraining = () => {
    const todayTraining = trainings.filter(
      (item) => item.date === (date as string)
    );

    if (todayTraining.length > 0) {
      return todayTraining[0].singleSet;
    }
    return null;
  };

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
      // console.log(data.trainings);
      dispatch(setTraining({ trainings: data.trainings }));
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
        trainings: newTrainings,
      },
      {
        headers,
      }
    );

    return data.trainings;
  };

  const addExercisesToTraining = async (selectedExercises: Exercise[]) => {
    try {
      const indexOfTraining = trainings
        .map((item) => item.date)
        .indexOf(date as string);

      let copyOfTraining;

      if (indexOfTraining === -1) {
        copyOfTraining = {
          date: date as string,
          singleSet: [],
        };
      } else {
        copyOfTraining = trainings[indexOfTraining];
      }

      const newSet = selectedExercises.map((item) => ({
        exercise: item,
        quantity: [],
      }));

      const copyOfSingleTraining = {
        ...copyOfTraining,
        singleSet: [...copyOfTraining.singleSet, ...newSet],
      };

      let newTrainings;

      if (indexOfTraining > -1)
        newTrainings = trainings.map((item, index) =>
          index === indexOfTraining ? copyOfSingleTraining : item
        );
      else newTrainings = [...trainings, copyOfSingleTraining];

      const response = await putRequest(newTrainings);

      dispatch(setTraining({ trainings: response }));
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
    getTodayTraining,
  };
};

export default useUpdateTraining;
