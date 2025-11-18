import { z } from 'zod';
import { Gender, NewPatient } from "./types";

// -----------------------------------------------------------------------
// Type substitutions
// -----------------------------------------------------------------------
export const NewPatientSchema = z.object({
  name: z.string(),
  gender: z.nativeEnum(Gender),
  occupation: z.string(),
  dateOfBirth: z.string().date().optional(),
  ssn: z.string().optional()
});


export const toNewPatient = (object: unknown): NewPatient =>
  NewPatientSchema.parse(object);