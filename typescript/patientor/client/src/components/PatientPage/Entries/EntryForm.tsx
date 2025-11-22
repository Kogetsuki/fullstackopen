import React, { useState } from 'react';
import axios from 'axios';

import { useField } from '../../../hooks';
import { Entry, NewEntry, Patient } from '../../../types';
import patientService from '../../../services/patients';

import { Button, Box, Typography, Alert, FormControl, InputLabel, Select, MenuItem } from '@mui/material';

import BaseEntryFields from './EntryForm/BaseEntryFields';
import HealthCheckForm from './EntryForm/HealthCheckForm';
import HospitalForm from './EntryForm/HospitalForm';
import OccupationalForm from './EntryForm/OccupationalForm';


interface Props {
  patient: Patient;
  onAddEntry: (entry: Entry) => void;
}

const EntryForm = ({ patient, onAddEntry }: Props) => {
  // BaseEntry fields
  const description = useField('text');
  const date = useField('text');
  const specialist = useField('text');
  const diagnosisCodes = useField('text');
  // HealthCheckEntry fields
  const healthCheckRating = useField('number');
  // HospitalEntry fields
  const dischargeDate = useField('text');
  const dischargeCriteria = useField('text');
  // OccupationalHealthcareEntry fields
  const employerName = useField('text');
  const sickLeaveStart = useField('text');
  const sickLeaveEnd = useField('text');

  const [error, setError] = useState<string | null>(null);
  const [entryType, setEntryType] = useState<NewEntry['type']>('HealthCheck');


  const resetFields = () => {
    description.reset();
    date.reset();
    specialist.reset();
    diagnosisCodes.reset();
    healthCheckRating.reset();
    dischargeDate.reset();
    dischargeCriteria.reset();
    employerName.reset();
    sickLeaveStart.reset();
    sickLeaveEnd.reset();
  };


  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError(null);

    const baseEntry = {
      description: description.value,
      date: date.value,
      specialist: specialist.value,
      diagnosisCodes: diagnosisCodes.value.split(/\s*,\s*/),
    };

    let newEntry: NewEntry;

    switch (entryType) {
      case 'HealthCheck':
        newEntry = {
          ...baseEntry,
          type: 'HealthCheck',
          healthCheckRating: Number(healthCheckRating.value)
        };
        break;

      case 'Hospital':
        newEntry = {
          ...baseEntry,
          type: 'Hospital',
          discharge: {
            date: dischargeDate.value,
            criteria: dischargeCriteria.value
          }
        };
        break;

      case 'OccupationalHealthcare':
        newEntry = {
          ...baseEntry,
          type: 'OccupationalHealthcare',
          employerName: employerName.value,
          sickLeave: {
            startDate: sickLeaveStart.value,
            endDate: sickLeaveEnd.value
          }
        };
        break;

      default:
        throw new Error('Incorrect entry type');
    }


    try {
      const createdEntry = await patientService.addEntry(patient.id, newEntry);
      onAddEntry(createdEntry);

      resetFields();
    }
    catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        if (error?.response?.data && typeof error?.response?.data === 'string') {
          const message = error.response.data.replace('Something went wrong. Error: ', '');
          setError(message);
        }

        else
          setError('Unrecognized axios error');
      }

      else
        setError('Unkown error');
    }
  };


  const handleCancel = () => {
    resetFields();
    setError(null);
  };


  return (
    <Box
      border={1}
      borderRadius={2}
      p={3}
      mt={4}
    >
      <Typography variant='h6'>
        New Entry
      </Typography>

      {error && <Alert severity='error'>{error}</Alert>}

      <form onSubmit={handleSubmit}>
        {/* Type Selector */}
        <FormControl fullWidth margin='normal'>
          <InputLabel>Entry Type</InputLabel>
          <Select
            value={entryType}
            label='Entry Type'
            onChange={(e) => setEntryType(e.target.value as NewEntry['type'])}
          >
            <MenuItem value='HealthCheck'>HealthCheck</MenuItem>
            <MenuItem value='Hospital'>Hospital</MenuItem>
            <MenuItem value='OccupationalHealthcare'>Occupational Healthcare</MenuItem>
          </Select>
        </FormControl>

        {/* Common Fields */}
        <BaseEntryFields
          description={description}
          date={date}
          specialist={specialist}
          diagnosisCodes={diagnosisCodes}
        />

        {/* Subforms */}
        {entryType === 'HealthCheck' && (
          <HealthCheckForm
            healthCheckRating={healthCheckRating}
          />
        )}

        {entryType === 'Hospital' && (
          <HospitalForm
            dischargeDate={dischargeDate}
            dischargeCriteria={dischargeCriteria}
          />
        )}

        {entryType === 'OccupationalHealthcare' && (
          <OccupationalForm
            employerName={employerName}
            sickLeaveStart={sickLeaveStart}
            sickLeaveEnd={sickLeaveEnd}
          />
        )}
      </form>

      <Box
        display='flex'
        justifyContent='space-between'
        mt={2}
      >
        <Button
          variant='contained'
          color='error'
          onClick={handleCancel}
        >
          Cancel
        </Button>

        <Button
          variant='contained'
          color='primary'
          type='submit'
        >
          Add
        </Button>
      </Box>
    </Box>
  );
};


export default EntryForm;