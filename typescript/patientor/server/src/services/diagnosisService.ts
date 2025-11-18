import diagnosisData from "../../data/diagnoses";
import { Diagnosis } from "../types";


const diagnoses: Diagnosis[] = diagnosisData as Diagnosis[];

const getAll = (): Diagnosis[] =>
  diagnoses;


export default {
  getAll
};