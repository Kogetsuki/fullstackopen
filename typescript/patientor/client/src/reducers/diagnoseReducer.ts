import { createSlice } from '@reduxjs/toolkit';
import diagnoseService from '../services/diagnoses';
import { AppDispatch } from '../store';
import { Diagnosis } from '../types';


const diagnoseSlice = createSlice({
  name: 'diagnoses',
  initialState: [] as Diagnosis[],
  reducers: {
    setDiagnoses(_state, action) {
      return action.payload;
    },
  }
});


const { setDiagnoses } = diagnoseSlice.actions;

export const fetchDiagnoses = () => {
  return async (dispatch: AppDispatch) => {
    const diagnoses = await diagnoseService.getAll();
    dispatch(setDiagnoses(diagnoses));
  };
};


export default diagnoseSlice.reducer;
