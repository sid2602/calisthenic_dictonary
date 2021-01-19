import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setRoutines, ModalT, ModalTypeTypes } from "data/modalSlice";
import { parseCookies } from "nookies";
import axios from "axios";
import { UserSlice } from "types/user";
import { Routine } from "types/routine";
import { Exercise } from "types/exercises";
import { setAddExerciseToRoutineFlag } from "data/modalSlice";
import { handleClose } from "data/dialogSlice";
import { openSnackbar, SnackbarType } from "data/snackbarSlice";
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

  const getRoutines = async () => {
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

      dispatch(setRoutines({ routines: Routine }));
    } catch (e) {
      dispatch(setRoutines({ routines: null }));
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

        const newRoutine = {
          ...routine,
          Exercises: {
            exercises: [...routine.Exercises.exercises, ...selectedExercises],
          },
        };
        const newRoutines = routines.map((routine) =>
          routine.id === newRoutine.id ? newRoutine : routine
        );

        const response = await putRequest(newRoutines);

        dispatch(setRoutines({ routines: response }));
        dispatch(setAddExerciseToRoutineFlag({ flag: false }));
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
      if (routines !== null) {
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
      }
    } catch (e) {
      dispatch(
        openSnackbar({
          message: "Can't add new routine",
          type: SnackbarType.error,
        })
      );
    }
  };

  return { getRoutines, removeExercise, addExercisesToRoutine, addNewRoutine };
};

export default useUpdateRoutines;
