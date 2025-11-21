import { RootState } from "../store";
import type { Diagnosis } from "../types";


export const getDiagnoses = (state: RootState): Diagnosis[] =>
  state.diagnoses;


export const getDiagnosis = (code: string) =>
  (state: RootState): Diagnosis | undefined =>
    state.diagnoses.find(d => d.code === code);