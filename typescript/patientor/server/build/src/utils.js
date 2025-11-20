"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.toNewPatient = exports.NewPatientSchema = void 0;
const zod_1 = require("zod");
const types_1 = require("./types");
// -----------------------------------------------------------------------
// Type substitutions
// -----------------------------------------------------------------------
exports.NewPatientSchema = zod_1.z.object({
    name: zod_1.z.string(),
    gender: zod_1.z.nativeEnum(types_1.Gender),
    occupation: zod_1.z.string(),
    dateOfBirth: zod_1.z.string().date().optional(),
    ssn: zod_1.z.string().optional()
});
const toNewPatient = (object) => exports.NewPatientSchema.parse(object);
exports.toNewPatient = toNewPatient;
//# sourceMappingURL=utils.js.map