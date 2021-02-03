import { useDispatch } from "react-redux";
import { openSnackbar, SnackbarType } from "data/snackbarSlice";

const useSnackbar = () => {
  const dispatch = useDispatch();

  const showSnackbar = (type: SnackbarType, message: string) => {
    dispatch(openSnackbar({ type, message }));
  };

  return { showSnackbar };
};

export default useSnackbar;
