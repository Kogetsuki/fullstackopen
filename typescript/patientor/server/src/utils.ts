import { z } from 'zod';
import { Gender, NewPatient } from "./types";

// -----------------------------------------------------------------------
// Type substitutions
// -----------------------------------------------------------------------
export const BaseEntrySchema = z.object({
  id: z.string(),
  description: z.string(),
  date: z.string().date(),
  specialist: z.string(),
  diagnosisCodes: z.array(z.string()).optional()
});

export const DischargeSchema = z.object({
  date: z.string(),
  criteria: z.string()
});

export const SickLeaveSchema = z.object({
  startDate: z.string().date(),
  endDate: z.string().date()
});

export const HospitalEntrySchema = BaseEntrySchema.extend({
  type: z.literal('Hospital'),
  discharge: DischargeSchema
});

export const HealthCheckSchema = BaseEntrySchema.extend({
  type: z.literal('HealthCheck'),
  healthCheckRating: z.number()
});

export const OccupationalHealthcareSchema = BaseEntrySchema.extend({
  type: z.literal('OccupationalHealthcare'),
  employerName: z.string(),
  sickLeave: SickLeaveSchema.optional()
});

export const EntrySchema = z.discriminatedUnion('type', [
  HospitalEntrySchema,
  HealthCheckSchema,
  OccupationalHealthcareSchema
]);


export const NewPatientSchema = z.object({
  name: z.string(),
  gender: z.nativeEnum(Gender),
  occupation: z.string(),
  dateOfBirth: z.string().date(),
  ssn: z.string(),
  entries: z.array(EntrySchema).optional().default([])
});


export const toNewPatient = (object: unknown): NewPatient =>
  NewPatientSchema.parse(object);