import patientData from '../data/patients';
import { NonSensitivePatient, Patient } from '../types';

const patients: Patient[] = patientData;

const getAll = (): NonSensitivePatient[] =>
  patients.map(({ ssn: _ssn, ...rest }) => rest);


export default {
  getAll,
};