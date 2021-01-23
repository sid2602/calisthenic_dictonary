import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type DateTypes = {
  date: {
    date: string | null;
  };
};

export type DateHandleChange = {
  date: string | null;
};

export type DateT = {
  date: DateTypes;
};

const date = new Date();
const dateString = date.toISOString().slice(0, 10);

const initialState = {
  date: {
    date: dateString,
  },
} as DateTypes;

export const DateSlice = createSlice({
  name: "date",
  initialState,
  reducers: {
    handleDateChange: (state, action: PayloadAction<DateHandleChange>) => {
      state.date.date = action.payload.date;
    },
  },
});

export const { handleDateChange } = DateSlice.actions;

export default DateSlice.reducer;
