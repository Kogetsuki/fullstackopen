import express, { Request, Response } from 'express';

import patientService from '../services/patientService';
import { newPatientParser, errorMiddleware } from '../middleware';
import { NonSensitivePatient, NewPatient, Patient } from '../types';

const router = express.Router();


router.get('/', (_req, res: Response<NonSensitivePatient[]>) =>
  res.send(patientService.getAll()));


router.get('/:id', (req: Request<{ id: string; }>, res: Response<Patient>) =>
  res.send(patientService.findById(req.params.id)));


router.post('/', newPatientParser, (req: Request<unknown, unknown, NewPatient>, res: Response<Patient>) => {
  const addedPatient = patientService.addPatient(req.body);
  res.json(addedPatient);
});


router.use(errorMiddleware);


export default router;