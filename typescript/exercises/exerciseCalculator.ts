interface Summary {
  periodLength: number;
  trainingDays: number;
  success: boolean;
  rating: number;
  ratingDescription: string;
  target: number;
  average: number;
}

interface ExercisesValues {
  target: number;
  dailyHours: number[];
}


const parseExerciseArguments = (args: string[]): ExercisesValues => {
  if (args.length < 4)
    throw new Error('Not enough arguments');

  const rawValues = args.slice(2);
  const numbers = rawValues.map(x => Number(x));

  if (numbers.some(isNaN))
    throw new Error('Provided values were not numbers');

  return {
    target: numbers[0],
    dailyHours: numbers.slice(1)
  };
};


const calculateExercises = (dailyHours: number[], target: number): Summary => {
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


try {
  const { target, dailyHours } = parseExerciseArguments(process.argv);
  console.log(calculateExercises(dailyHours, target));
}
catch (error: unknown) {
  let errorMessage = 'message';
  if (error instanceof Error)
    errorMessage += ` Error: ${error.message}`;

  console.log(errorMessage);
}