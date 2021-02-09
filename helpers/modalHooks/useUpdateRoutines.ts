import { useDispatch, useSelector } from "react-redux";
import {
  setRoutines,
  ModalT,
  ModalTypeTypes,
  openModal,
} from "data/modalSlice";
import { parseCookies } from "nookies";
import axios from "axios";
import { UserSlice } from "types/user";
import { Routine } from "types/routine";
import { Exercise } from "types/exercises";
import { setFlags } from "data/modalSlice";
import { handleClose } from "data/dialogSlice";
import { SnackbarType } from "data/snackbarSlice";
import { setUser } from "data/userSlice";

import useSnackbar from "helpers/snackbarHooks/useSnackbar";
import { handleFetchLoadingChange } from "data/loaderSlice";
const useUpdateRoutines = () => {
  const dispatch = useDispatch();
  const api_url = process.env.API_URL;
  const { showSnackbar } = useSnackbar();

  const ModalState = useSelector<ModalT, ModalT["modal"]>(
    (state) => state.modal
  );

  const { routines, activeRoutine } = ModalState.modal;
  const userState = useSelector<UserSlice, UserSlice["user"]>(
    (state) => state.user
  );

  const createRoutine = async () => {
    const newRoutine = {
      user: userState.user?.id,
      Routine: [],
    };
    const { jwt } = parseCookies();
    const { data } = await axios.post(`${api_url}routines`, newRoutine, {
      headers: {
        Authorization: `Bearer ${jwt}`,
      },
    });

    dispatch(setRoutines({ routines: data.Routine }));
    dispatch(setUser({ user: data.user }));
  };

  const getRoutines = async () => {
    try {
      if (userState.user?.routine === null) {
        createRoutine();
      } else {
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

        dispatch(setRoutines({ routines: Routine }));
      }
    } catch (e) {
      showSnackbar(SnackbarType.error, "Can't get routines");
    }
  };

  const putRequest = async (newRoutines: Routine[]) => {
    try {
      if (routines !== null) {
        dispatch(handleFetchLoadingChange({ loading: true }));
        const { jwt } = parseCookies();

        const headers = {
          Authorization: `Bearer ${jwt}`,
        };

        const { data } = await axios.put(
          `${api_url}routines/${userState.user?.routine}`,
          {
            Routine: newRoutines,
          },
          {
            headers,
          }
        );
        dispatch(handleFetchLoadingChange({ loading: false }));
        return data.Routine;
      }

      throw new Error();
    } catch {
      dispatch(handleFetchLoadingChange({ loading: false }));
      return null;
    }
  };

  const removeExercise = async (exerciseId: number) => {
    try {
      if (routines !== null && activeRoutine !== null) {
        const routine = routines[activeRoutine];
        const exercises = routine.Exercises.exercises.filter(
          (exercise) => exercise.id !== exerciseId
        );

        const newRoutine = {
          ...routine,
          Exercises: {
            exercises,
          },
        };

        const newRoutines = routines.map((routine) =>
          routine.id === newRoutine.id ? newRoutine : routine
        );

        const response = await putRequest(newRoutines);

        dispatch(handleClose());
        dispatch(setRoutines({ routines: response }));
        showSnackbar(SnackbarType.success, "Successfully removed exercise");
      }
    } catch (e) {
      showSnackbar(SnackbarType.error, "Can't remove exercise");
    }
  };

  const addExercisesToRoutine = async (selectedExercises: Exercise[]) => {
    try {
      if (routines !== null && activeRoutine !== null) {
        const routine = routines[activeRoutine];
        let newRoutine: Routine;

        const { exercises } = routines[activeRoutine].Exercises;
        if (exercises) {
          newRoutine = {
            ...routine,
            Exercises: {
              exercises: [...routine.Exercises.exercises, ...selectedExercises],
            },
          };
        } else {
          newRoutine = {
            ...routine,
            Exercises: {
              exercises: [...selectedExercises],
            },
          };
        }

        const newRoutines = routines.map((routine) =>
          routine.id === newRoutine.id ? newRoutine : routine
        );

        const response = await putRequest(newRoutines);

        dispatch(setRoutines({ routines: response }));
        dispatch(setFlags({ addExerciseToRoutineFlag: false }));
        dispatch(openModal({ type: ModalTypeTypes.singleRoutine }));
        showSnackbar(
          SnackbarType.success,
          "Successfully added new exercises to routine"
        );
      }
    } catch (e) {
      showSnackbar(SnackbarType.error, "Can't add new exercises to routine");
    }
  };

  const addNewRoutine = async (name: string) => {
    try {
      if (routines !== null && name !== "") {
        const newRoutine = {
          image: [],
          Exercises: {
            exercises: [],
          },
          name,
        };

        const newRoutines = [...routines, newRoutine];

        const response = await putRequest(newRoutines);

        dispatch(handleClose());
        dispatch(setRoutines({ routines: response }));
        showSnackbar(SnackbarType.success, "Successfully added new routine");
      } else {
        throw new Error();
      }
    } catch (e) {
      const message =
        name === "" ? "Add a name for the routine" : "Can't add new routine";
      showSnackbar(SnackbarType.error, message);
    }
  };

  const removeRoutine = async (routineId: number) => {
    try {
      if (routines !== null) {
        const newRoutines = routines.filter(
          (routine) => routine.id !== routineId
        );

        const response = await putRequest(newRoutines);
        dispatch(setRoutines({ routines: response }));
        showSnackbar(SnackbarType.success, "Successfully removed exercise");
      }
    } catch (e) {
      showSnackbar(SnackbarType.error, "Can't remove routine");
    }
  };

  const editRoutine = async (name: string) => {
    try {
      if (routines !== null && name !== "" && activeRoutine !== null) {
        const routine = routines[activeRoutine];

        const newRoutine = {
          ...routine,
          name: name,
        };

        const newRoutines = routines.map((item) =>
          item.id === newRoutine.id ? newRoutine : item
        );

        const response = await putRequest(newRoutines);
        dispatch(handleClose());
        dispatch(setRoutines({ routines: response }));
        showSnackbar(SnackbarType.success, "Successfully rename");
      } else {
        throw new Error();
      }
    } catch (e) {
      const message =
        name === "" ? "Add a name for the routine" : "Can't edit routine";
      showSnackbar(SnackbarType.error, name);
    }
  };

  return {
    getRoutines,
    removeExercise,
    addExercisesToRoutine,
    addNewRoutine,
    removeRoutine,
    editRoutine,
  };
};

export default useUpdateRoutines;
