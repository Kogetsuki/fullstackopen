interface Summary {
  periodLength: number;
  trainingDays: number;
  success: boolean;
  rating: number;
  ratingDescription: string;
  target: number;
  average: number;
}

export interface ExercisesValues {
  dailyHours: number[];
  target: number;
}


export const calculateExercises = (dailyHours: number[], target: number): Summary => {
  const periodLength = dailyHours.length;
  const trainingDays = dailyHours.filter(h => h > 0).length;

  const totalHours = dailyHours.reduce((sum, x) => sum + x, 0);
  const average = totalHours / periodLength;

  const success = average >= target;

  let rating: number;
  let ratingDescription: string;

  if (success) {
    rating = 3;
    ratingDescription = 'Great job! Target met.';
  }

  else if (target >= average * 0.9) {
    rating = 2;
    ratingDescription = 'Not too bad but could be better.';
  }

  else {
    rating = 1;
    ratingDescription = 'You are far from your target.';
  }

  return {
    periodLength,
    trainingDays,
    success,
    rating,
    ratingDescription,
    target,
    average
  };
};