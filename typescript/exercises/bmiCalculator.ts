interface BmiValues {
  height: number;
  weight: number;
}


const parseBmiArguments = (args: string[]): BmiValues => {
  if (args.length < 4)
    throw new Error('Not enough arguments');
  if (args.length > 4)
    throw new Error('Too many arguments');

  if (!isNaN(Number(args[2])) && !isNaN(Number(args[3])))
    return {
      height: Number(args[2]),
      weight: Number(args[3])
    };

  else
    throw new Error('Provided values were not numbers');
};


const calculateBmi = (height: number, weight: number): string => {
  const bmi = weight / (height * height) * 10000;
  switch (true) {
    case bmi < 16:
      return 'Severe Thinness';
    case bmi < 17:
      return 'Moderate Thinness';
    case bmi < 18.5:
      return 'Mild Thinness';
    case bmi < 25:
      return 'Normal';
    case bmi < 30:
      return 'Overweight';
    case bmi < 35:
      return 'Obese Class I';
    case bmi < 40:
      return 'Obese Class II';
    case bmi > 40:
      return 'Obese Class III';
  }
};

try {
  const { height, weight } = parseBmiArguments(process.argv);
  console.log(calculateBmi(height, weight));
}
catch (error: unknown) {
  let errorMessage = 'message';
  if (error instanceof Error)
    errorMessage += ` Error: ${error.message}`;

  console.log(errorMessage);
}