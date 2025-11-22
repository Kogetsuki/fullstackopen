import express, { Request, Response } from 'express';

import patientService from '../services/patientService';
import { newPatientParser, errorMiddleware } from '../middleware';
import { NonSensitivePatient, NewPatient, Patient, NewEntry } from '../types';
import { toNewEntry } from '../utils';

const router = express.Router();


router.get('/', (_req, res: Response<NonSensitivePatient[]>) =>
  res.send(patientService.getAll()));


router.get('/:id', (req: Request<{ id: string; }>, res: Response<Patient>) =>
  res.send(patientService.findById(req.params.id)));


router.post('/', newPatientParser, (req: Request<unknown, unknown, NewPatient>, res: Response<Patient>) => {
  const addedPatient: Patient = patientService.addPatient(req.body);
  res.json(addedPatient);
});


router.post('/:id/entries', (req, res) => {
  const patientId = req.params.id;

  try {
    const newEntry: NewEntry = toNewEntry(req.body);
    const addedEntry = patientService.addEntry(patientId, newEntry);

    res.json(addedEntry);
  }
  catch (error: unknown) {
    if (error instanceof Error)
      res.status(400).send({ error: error.message });
  }
});


router.use(errorMiddleware);


export default router;