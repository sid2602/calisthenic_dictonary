import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { User } from "types/user";

const initialState = {
  user: {},
} as User;

export type UserT = {
  user: User;
};

export const UserSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<User>) => {
      state.user = action.payload.user;
    },
  },
});

export const { setUser } = UserSlice.actions;

export default UserSlice.reducer;
