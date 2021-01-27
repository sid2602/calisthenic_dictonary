import { useEffect } from "react";
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
import { openSnackbar, SnackbarType } from "data/snackbarSlice";
import { setUser } from "data/userSlice";
import { User } from "types/user";
import { userIsLogged } from "services/auth";
const useUpdateRoutines = () => {
  const dispatch = useDispatch();
  const api_url = process.env.API_URL;

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
      dispatch(
        openSnackbar({
          message: "Can't get routines",
          type: SnackbarType.error,
        })
      );
    }
  };

  const putRequest = async (newRoutines: Routine[]) => {
    if (routines !== null) {
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

      return data.Routine;
    }

    return null;
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
        dispatch(
          openSnackbar({
            message: "Successfully removed exercise",
            type: SnackbarType.success,
          })
        );
      }
    } catch (e) {
      dispatch(
        openSnackbar({
          message: "Can't remove exercise",
          type: SnackbarType.error,
        })
      );
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
        dispatch(
          openSnackbar({
            message: "Successfully added new exercises to routine",
            type: SnackbarType.success,
          })
        );
      }
    } catch (e) {
      dispatch(
        openSnackbar({
          message: "Can't add new exercises to routine",
          type: SnackbarType.error,
        })
      );
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
        dispatch(
          openSnackbar({
            message: "Successfully added new routine",
            type: SnackbarType.success,
          })
        );
      } else {
        throw new Error();
      }
    } catch (e) {
      dispatch(
        openSnackbar({
          message: ` ${
            name === "" ? "Add a name for the routine" : "Can't add new routine"
          }`,
          type: SnackbarType.error,
        })
      );
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
        dispatch(setRoutines({ routines: response }));
        dispatch(
          openSnackbar({
            message: "Successfully removed exercise",
            type: SnackbarType.success,
          })
        );
      }
    } catch (e) {
      dispatch(
        openSnackbar({
          message: "Can't remove routine",
          type: SnackbarType.error,
        })
      );
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
        dispatch(
          openSnackbar({
            message: "successfully rename",
            type: SnackbarType.success,
          })
        );
      } else {
        throw new Error();
      }
    } catch (e) {
      dispatch(
        openSnackbar({
          message: ` ${
            name === "" ? "Add a name for the routine" : "Can't edit routine"
          }`,
          type: SnackbarType.error,
        })
      );
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
