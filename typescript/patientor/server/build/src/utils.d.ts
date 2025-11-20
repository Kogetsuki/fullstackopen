import { z } from 'zod';
import { Gender, NewPatient } from "./types";
export declare const NewPatientSchema: z.ZodObject<{
    name: z.ZodString;
    gender: z.ZodNativeEnum<typeof Gender>;
    occupation: z.ZodString;
    dateOfBirth: z.ZodOptional<z.ZodString>;
    ssn: z.ZodOptional<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    name: string;
    gender: Gender;
    occupation: string;
    dateOfBirth?: string | undefined;
    ssn?: string | undefined;
}, {
    name: string;
    gender: Gender;
    occupation: string;
    dateOfBirth?: string | undefined;
    ssn?: string | undefined;
}>;
export declare const toNewPatient: (object: unknown) => NewPatient;
//# sourceMappingURL=utils.d.ts.map