import { Exercise } from "./exercises";

export type Training = {
  id?: number;
  date: string;
  Exercises: {
    exercises: Exercise[];
  };
};
