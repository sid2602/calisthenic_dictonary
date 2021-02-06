import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type LoaderTypes = {
  loader: {
    fetchLoading: boolean;
  };
};

export type LoaderHandleChange = {
  loading: boolean;
};

export type LoaderT = {
  loader: LoaderTypes;
};

const initialState = {
  loader: {
    fetchLoading: false,
  },
} as LoaderTypes;

export const LoadingSlice = createSlice({
  name: "loader",
  initialState,
  reducers: {
    handleFetchLoadingChange: (
      state,
      action: PayloadAction<LoaderHandleChange>
    ) => {
      state.loader.fetchLoading = action.payload.loading;
    },
  },
});

export const { handleFetchLoadingChange } = LoadingSlice.actions;

export default LoadingSlice.reducer;
