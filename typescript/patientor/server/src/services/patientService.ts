import { v1 as uuid } from 'uuid';
import patientData from '../../data/patients';
import { NonSensitivePatient, Patient, NewPatient, NewEntry, Entry } from '../types';

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


const addEntry = (id: string, entry: NewEntry): Entry => {
  const patient = findById(id);

  if (!patient)
    throw new Error('Patient not found');

  const newEntry: Entry = {
    id: uuid(),
    ...entry
  };

  patient.entries.push(newEntry);
  return newEntry;
};


const findById = (id: string): Patient | undefined =>
  patients.find(p => p.id === id);


export default {
  getAll,
  addPatient,
  addEntry,
  findById
};