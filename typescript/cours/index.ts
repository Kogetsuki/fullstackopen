import express from 'express';
import { calculator, Operation } from './calculator';

const app = express();
const PORT = 3003;

app.get('/ping', (_, res) =>
  res.send('pong'));

app.post('/calculate', (req, res) => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const { value1, value2, op } = req.body;

  // Validate the data here
  if (!value1 || isNaN(Number(value1)))
    return res.status(400).send({ error: '...' });

  const result = calculator(
    Number(value1),
    Number(value2),
    op as Operation
  );

  return res.send({ result });
});

app.listen(PORT, () =>
  console.log(`Server running on port ${PORT}`));