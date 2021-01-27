import { useState, useEffect } from "react";
import { Exercise } from "types/exercises";

const useSelectExercise = (selectAll: boolean, exercises: Exercise[]) => {
  const [selectedExercises, setSelectedExercises] = useState<Exercise[]>([]);

  const selectExercise = (exercise: Exercise): void => {
    const index = selectedExercises
      .map((index) => index.id)
      .indexOf(exercise.id);
    index === -1
      ? setSelectedExercises([...selectedExercises, exercise])
      : setSelectedExercises(
          selectedExercises.filter((item) => item.id !== exercise.id)
        );
  };

  useEffect(() => {
    if (selectAll && exercises) {
      setSelectedExercises([...selectedExercises, ...exercises]);
    }
  }, []);

  return {
    selectedExercises,
    selectExercise,
  };
};

export default useSelectExercise;
