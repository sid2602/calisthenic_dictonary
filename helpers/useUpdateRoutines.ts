import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setRoutines, ModalT, ModalTypeTypes } from "data/modalSlice";
import { parseCookies } from "nookies";
import axios from "axios";
import { UserSlice } from "types/user";
import { Routine } from "types/routine";
import { Exercise } from "types/exercises";
import { setAddExerciseToRoutineFlag } from "data/modalSlice";
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

  const putRequest = async (newRoutine: Routine) => {
    if (routines !== null) {
      const newRoutines = routines.map((routine) =>
        routine.id === newRoutine.id ? newRoutine : routine
      );

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

        const response = await putRequest(newRoutine);

        dispatch(setRoutines({ routines: response }));
      }
    } catch (e) {
      dispatch(setRoutines({ routines: null }));
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

        const response = await putRequest(newRoutine);

        dispatch(setRoutines({ routines: response }));
        dispatch(setAddExerciseToRoutineFlag({ flag: false }));
      }
    } catch (e) {
      dispatch(setRoutines({ routines: null }));
    }
  };

  return { getRoutines, removeExercise, addExercisesToRoutine };
};

export default useUpdateRoutines;
