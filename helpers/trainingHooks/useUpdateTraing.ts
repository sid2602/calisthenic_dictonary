import { useDispatch, useSelector } from "react-redux";
import { UserSlice, User } from "types/user";
import { parseCookies } from "nookies";
import axios from "axios";
import { setUser } from "data/userSlice";
import { DateT } from "data/dateSlice";
import { openSnackbar, SnackbarType } from "data/snackbarSlice";
import { setTraining } from "data/trainingSlice";
const useUpdateTraining = () => {
  const userState = useSelector<UserSlice, UserSlice["user"]>(
    (state) => state.user
  );

  const DateState = useSelector<DateT, DateT["date"]>((state) => state.date);
  const { user } = userState;
  const { date } = DateState.date;

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

  return { createTrainingComponent, getTrainings, date };
};

export default useUpdateTraining;
