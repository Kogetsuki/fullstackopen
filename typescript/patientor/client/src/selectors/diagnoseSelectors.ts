import store, { RootState } from "../store";
import type { Diagnosis } from "../types";


export const getDiagnoses = (): Diagnosis[] => {
  const state: RootState = store.getState();
  return state.diagnoses;
};


export const getDiagnosis = (code: string) =>
  (state: RootState): Diagnosis | undefined =>
    state.diagnoses.find(d => d.code === code);