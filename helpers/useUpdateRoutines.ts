import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setRoutines } from "data/modalSlice";
import { parseCookies } from "nookies";
import axios from "axios";
import { UserSlice } from "types/user";
import { Routine } from "types/routine";

const useUpdateRoutines = () => {
  const dispatch = useDispatch();
  const api_url = process.env.API_URL;
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

  const removeExercise = async (routines: Routine[]) => {
    try {
      const { jwt } = parseCookies();

      const headers = {
        Authorization: `Bearer ${jwt}`,
      };

      const { data } = await axios.put(
        `${api_url}routines/${userState.user?.routine}`,
        {
          Routine: routines,
        },
        {
          headers,
        }
      );

      const { Routine } = data;
      dispatch(setRoutines({ routines: Routine }));
    } catch (e) {
      dispatch(setRoutines({ routines: null }));
    }
  };

  return { getRoutines, removeExercise };
};

export default useUpdateRoutines;
