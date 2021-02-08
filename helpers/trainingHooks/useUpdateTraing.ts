import { useDispatch, useSelector } from "react-redux";
import { UserSlice } from "types/user";
import { parseCookies } from "nookies";
import axios from "axios";
import { setUser } from "data/userSlice";
import { DateT } from "data/dateSlice";
import { SnackbarType } from "data/snackbarSlice";
import { setTraining, TrainingT } from "data/trainingSlice";
import { Exercise, VariantType } from "types/exercises";
import { Training } from "types/training";

import { handleClose } from "data/modalSlice";
import { State } from "components/dialog/seriesDialog/seriesDialog";
import { DialogT, handleClose as dialogHandleClose } from "data/dialogSlice";
import useSnackbar from "helpers/snackbarHooks/useSnackbar";
import { handleFetchLoadingChange } from "data/loaderSlice";
const useUpdateTraining = () => {
  const trainingState = useSelector<TrainingT, TrainingT["training"]>(
    (state) => state.training
  );
  const userState = useSelector<UserSlice, UserSlice["user"]>(
    (state) => state.user
  );
  const DateState = useSelector<DateT, DateT["date"]>((state) => state.date);
  const DialogState = useSelector<DialogT, DialogT["dialog"]>(
    (state) => state.dialog
  );

  const { date } = DateState.date;
  const { trainings } = trainingState.training;
  const { activeSingleSet } = DialogState.dialog;
  const { showSnackbar } = useSnackbar();

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
      showSnackbar(SnackbarType.success, "Can't create training component");
    }
  };

  const getTrainings = async (trainingId: number) => {
    try {
      const { jwt } = parseCookies();

      const { data } = await axios.get(`${api_url}trainings/${trainingId}`, {
        headers: { Authorization: `Bearer ${jwt}` },
      });

      dispatch(setTraining({ trainings: data.trainings }));
    } catch (e) {
      showSnackbar(SnackbarType.error, "Can't get trainings");
    }
  };

  const putRequest = async (newTrainings: Training[]) => {
    try {
      dispatch(handleFetchLoadingChange({ loading: true }));
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
      dispatch(handleFetchLoadingChange({ loading: false }));
      return data.trainings;
    } catch {
      dispatch(handleFetchLoadingChange({ loading: false }));
      return [];
    }
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

      showSnackbar(
        SnackbarType.success,
        "Sucessfully added exercises to training"
      );
      dispatch(handleClose());
    } catch (error) {
      showSnackbar(SnackbarType.error, "Can't update training");
      dispatch(handleClose());
    }
  };

  const returnNewSeries = (
    id: number,
    kg: number,
    minutes: number,
    seconds: number,
    reps: number
  ) => {
    let newSeries;

    if (seconds > 0 && minutes > 0) {
      newSeries = {
        quantity: minutes * 60 + seconds,
        variant: VariantType.minSec,
      };
    } else if (minutes > 0) {
      newSeries = {
        quantity: `${minutes}`,
        variant: VariantType.minutes,
      };
    } else if (seconds > 0) {
      newSeries = {
        quantity: `${seconds}`,
        variant: VariantType.seconds,
      };
    } else if (reps > 0) {
      newSeries = {
        quantity: `${reps}`,
        variant: VariantType.rep,
      };
    }

    if (id > -1) {
      newSeries = {
        ...newSeries,
        id,
      };
    }

    if (kg > 0) {
      newSeries = {
        ...newSeries,
        kg,
      };
    } else {
      newSeries = {
        ...newSeries,
        kg: 0,
      };
    }

    return newSeries;
  };

  const actionOnSeries = async (values: State, activeSeries: number) => {
    let badValues = false;

    try {
      const parsedValues = {
        kg: parseInt(values.kg),
        minutes: parseInt(values.minutes),
        seconds: parseInt(values.seconds),
        reps: parseInt(values.rep),
      };

      const { kg, minutes, seconds, reps } = parsedValues;
      if (kg > 0 || minutes > 0 || seconds > 0 || reps > 0) {
        const actualTraining = trainings.filter(
          (item) => item.date === date
        )[0];

        const actualSingleSet = actualTraining.singleSet.filter(
          (item) => item.id === activeSingleSet
        )[0];

        const newSeries = returnNewSeries(
          activeSeries,
          kg,
          minutes,
          seconds,
          reps
        );

        type UpdatedActualSingleSet = {
          quantity: {
            kg: number;
          }[];
          exercise: Exercise;
          id?: number;
        };

        let updatedActualSingleSet: UpdatedActualSingleSet;

        //add new seires
        if (activeSeries === -1) {
          updatedActualSingleSet = {
            ...actualSingleSet,
            quantity: [...actualSingleSet.quantity, newSeries],
          };
        } else {
          //edit actual series
          updatedActualSingleSet = {
            ...actualSingleSet,
            quantity: actualSingleSet.quantity.map((item) =>
              item.id === activeSeries ? newSeries : item
            ),
          };
        }

        const newTraining = {
          ...actualTraining,
          singleSet: [
            ...actualTraining.singleSet.map((item) =>
              item.id === updatedActualSingleSet.id
                ? updatedActualSingleSet
                : item
            ),
          ],
        };
        const newTrainings = trainings.map((item) =>
          item.id === newTraining.id ? newTraining : item
        );

        const response = await putRequest(newTrainings as Training[]);

        dispatch(setTraining({ trainings: response }));
        dispatch(dialogHandleClose());
        showSnackbar(
          SnackbarType.success,
          "Sucessfully added series to exercise"
        );
      } else {
        badValues = true;
        throw new Error();
      }
    } catch (e) {
      showSnackbar(
        SnackbarType.error,
        badValues ? "use only numbers!" : "Can't add new series"
      );
    }
  };

  const removeExerciseFromTraining = async (singleSetID: number) => {
    try {
      const newTrainings = trainings.map((item) => ({
        ...item,
        singleSet: item.singleSet.filter(
          (singleSet) => singleSet.id !== singleSetID
        ),
      }));

      const response = await putRequest(newTrainings);
      dispatch(setTraining({ trainings: response }));
      showSnackbar(SnackbarType.success, "Sucessfully removed exercise");
    } catch {
      showSnackbar(SnackbarType.error, "Can't remove Exercise");
    }
  };

  const removeSeries = async (activeSeries: number) => {
    // console.log(activeSingleSet);
    try {
      const newTrainings = trainings.map((item) => ({
        ...item,
        singleSet: [
          ...item.singleSet.map((singleSet) => {
            const newSingleSet = {
              ...singleSet,
              quantity: singleSet.quantity.filter(
                (quantity) => quantity.id !== activeSeries
              ),
            };

            return newSingleSet;
          }),
        ],
      }));
      const response = await putRequest(newTrainings);
      dispatch(setTraining({ trainings: response }));
      showSnackbar(SnackbarType.success, "Sucessfully removed exercise");
      dispatch(dialogHandleClose());
    } catch {
      showSnackbar(SnackbarType.error, "Can't remove series");
    }
  };

  return {
    createTrainingComponent,
    getTrainings,
    addExercisesToTraining,
    date,
    getTodayTraining,
    actionOnSeries,
    removeExerciseFromTraining,
    removeSeries,
  };
};

export default useUpdateTraining;
