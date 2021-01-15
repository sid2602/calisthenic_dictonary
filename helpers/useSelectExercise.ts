import { useState, useEffect } from "react";
import { Exercise } from "types/exercises";

const useSelectExercise = (selectAll: boolean, exercises: Exercise[]) => {
  const [selectedExercises, setSelectedExercises] = useState<number[]>([]);

  const selectExercise = (exerciseId: number): void => {
    const index = selectedExercises.indexOf(exerciseId);
    index === -1
      ? setSelectedExercises([...selectedExercises, exerciseId])
      : setSelectedExercises(
          selectedExercises.filter((item) => item !== exerciseId)
        );
  };

  useEffect(() => {
    if (selectAll) {
      const exercisesIds = exercises.map((exercise) => exercise.id);
      setSelectedExercises([...selectedExercises, ...exercisesIds]);
    }
  }, []);

  return {
    selectedExercises,
    selectExercise,
  };
};

export default useSelectExercise;
