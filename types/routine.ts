import { Exercise } from "./exercises";

export type Routine = {
  id?: number;
  name: string;
  Exercises: {
    exercises: Exercise[];
  };
  image: object;
};
