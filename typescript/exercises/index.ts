import express from "express";
import { calculateBmi } from "./bmiCalculator";
import { calculateExercises } from "./exerciseCalculator";


const app = express();
const PORT = 3003;

app.use(express.json());

app.get('/hello', (_req, res) =>
  res.send('Hello Full Stack!'));


app.get('/bmi', (req, res) => {
  const { height, weight } = req.query;

  if (!height || !weight || isNaN(Number(height)) || isNaN(Number(weight)))
    return res.status(404).json({ error: 'malformatted parameters' });

  const h = Number(height);
  const w = Number(weight);
  const bmi = calculateBmi(h, w);

  return res.json({
    height: h,
    weight: w,
    bmi
  });
});


app.post('/exercises', (req, res) => {
  const { dailyExercises, target } = req.body;

  if (!dailyExercises || !target)
    return res.status(400).send({ error: "parameters missing" });

  // eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/no-unsafe-call
  const dailyExercisesNumbers: any = dailyExercises.map((x: any) => Number(x));

  // eslint-disable-next-line @typescript-eslint/no-unsafe-call
  if (isNaN(Number(target)) || dailyExercisesNumbers.some(isNaN))
    return res.status(400).send({ error: "malformatted parameters" });

  const result = calculateExercises(
    dailyExercises,
    Number(target)
  );

  return res.send({ result });
});

app.listen(PORT, () =>
  console.log(`Server running on port ${PORT}`));