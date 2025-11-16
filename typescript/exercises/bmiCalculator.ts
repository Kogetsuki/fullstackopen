export interface BmiValues {
  height: number;
  weight: number;
}


export const calculateBmi = (height: number, weight: number): string => {
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
    default:
      return 'Obese Class III';
  }
};