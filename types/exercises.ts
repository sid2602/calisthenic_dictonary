export type ExercisesMuscleGroups = {
  id: number;
  muscle_group: string;
  exercises: Exercises[];
  icon: {
    url: string;
    hash: string;
  };
};

export type Exercises = {
  id: number;
  name: string;
  description: string;
};
