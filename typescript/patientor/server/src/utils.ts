import { NewPatient, Gender } from "./types";

// -----------------------------------------------------------------------
// Type substitutions
// -----------------------------------------------------------------------
const toNewPatient = (object: unknown): NewPatient => {
  if (!object || typeof object !== 'object')
    throw new Error('Incorrect or missing data');

  if (!('name' in object) || !('gender' in object) || !('occupation' in object))
    throw new Error('Incorrect data: some fields are missing');

  const newPatient: NewPatient = {
    name: parseName(object.name),
    gender: parseGender(object.gender),
    occupation: parseOccupation(object.occupation)
  };

  if ('ssn' in object)
    newPatient.ssn = parseSsn(object.ssn);

  if ('dateOfBirth' in object)
    newPatient.dateOfBirth = parseDateOfBirth(object.dateOfBirth);

  return newPatient;
};

//TODO: check maybe ssn format


// -----------------------------------------------------------------------
// Type guards
// -----------------------------------------------------------------------
const isString = (text: unknown): text is string =>
  typeof text === 'string' || text instanceof String;


const isDate = (date: string): boolean =>
  Boolean(Date.parse(date));


const isGender = (param: string): param is Gender =>
  Object.values(Gender).map(v =>
    v.toString()).includes(param);


// -----------------------------------------------------------------------
// Parameter guards
// -----------------------------------------------------------------------
const parseName = (name: unknown): string => {
  if (!isString(name))
    throw new Error(`Incorrect or missing name: ${name}`);

  return name;
};


const parseOccupation = (occupation: unknown): string => {
  if (!isString(occupation))
    throw new Error(`Incorrect or missing gender: ${occupation}`);

  return occupation;
};


const parseGender = (gender: unknown): Gender => {
  if (!isString(gender) || !isGender(gender))
    throw new Error(`Incorrect or missing gender: ${gender}`);

  return gender;
};


const parseSsn = (ssn: unknown): string => {
  if (!isString(ssn))
    throw new Error(`Incorrect or missing ssn: ${ssn}`);

  return ssn;
};


const parseDateOfBirth = (dateOfBirth: unknown): string => {
  if (!isString(dateOfBirth) || !isDate(dateOfBirth))
    throw new Error(`Incorrect or missing dateOfBirth: ${dateOfBirth}`);

  return dateOfBirth;
};


export default toNewPatient;