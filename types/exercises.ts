export type ExercisesMuscleGroups = {
  id: number;
  muscle_group: string;
  exercises: Exercise[];
  icon: {
    url: string;
    hash: string;
  };
};

export type Exercise = {
  id: number;
  name: string;
  description: string;
  variant: VariantType;
};

export enum VariantType {
  rep = "rep",
  seconds = "seconds",
  minutes = "minutes",
  minSec = "minSec",
}
