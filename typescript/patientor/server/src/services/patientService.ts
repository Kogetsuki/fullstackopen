import { v1 as uuid } from 'uuid';
import patientData from '../data/patients';
import { NonSensitivePatient, Patient, NewPatient } from '../types';

const patients: Patient[] = patientData;

const getAll = (): NonSensitivePatient[] =>
  patients.map(({ ssn: _ssn, ...rest }) => rest);


const addPatient = (patient: NewPatient): Patient => {
  const newPatient: Patient = {
    id: uuid(),
    ...patient
  };

  patients.push(newPatient);
  return newPatient;
};

export default {
  getAll,
  addPatient
};