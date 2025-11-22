import React, { useState } from 'react';
import { useField } from '../../../hooks';
import { Entry, NewEntry, Patient } from '../../../types';
import patientService from '../../../services/patients';

import { TextField, Button, Box, Typography, Alert } from '@mui/material';


interface Props {
  patient: Patient;
  onAddEntry: (entry: Entry) => void;
}

const EntryForm = ({ patient, onAddEntry }: Props) => {
  const description = useField('text');
  const date = useField('text');
  const specialist = useField('text');
  const diagnosisCodes = useField('text');
  const healthCheckRating = useField('number');

  const [error, setError] = useState<string | null>(null);



  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError(null);

    const newEntry: NewEntry = {
      type: 'HealthCheck',
      description: description.value,
      date: date.value,
      specialist: specialist.value,
      diagnosisCodes: diagnosisCodes.value.split(/\s*,\s*/),
      healthCheckRating: Number(healthCheckRating.value)
    };

    const createdEntry = await patientService.addEntry(patient.id, newEntry);
    onAddEntry(createdEntry);


    // handleCancel();
  };

  const handleCancel = () => {
    description.reset();
    date.reset();
    specialist.reset();
    diagnosisCodes.reset();
    healthCheckRating.reset();

    setError(null);
  };


  return (
    <Box
      border={1}
      borderRadius={2}
      p={3}
      maxWidth={800}
      marginTop='2em'
      marginBottom='2em'
    >
      <Typography variant='h6' gutterBottom>
        New HealthCheck entry
      </Typography>

      <form onSubmit={handleSubmit} noValidate autoComplete='off'>
        {error && (
          <Alert severity='error' sx={{ mb: 2 }}>
            {error}
          </Alert>
        )}

        <TextField
          fullWidth
          label='Description'
          margin='normal'
          InputLabelProps={{ shrink: true }}
          {...description.input}
        />

        <TextField
          fullWidth
          label='Date'
          InputLabelProps={{ shrink: true }}
          margin='normal'
          {...date.input}
        />

        <TextField
          fullWidth
          label='Specialist'
          margin='normal'
          InputLabelProps={{ shrink: true }}
          {...specialist.input}
        />

        <TextField
          fullWidth
          label='Diagnosis codes'
          placeholder='Z57.1, N30.0'
          margin='normal'
          InputLabelProps={{ shrink: true }}
          {...diagnosisCodes.input}
        />

        <TextField
          fullWidth
          label='HealthCheck Rating'
          inputProps={{ min: 0, max: 3 }}
          margin='normal'
          InputLabelProps={{ shrink: true }}
          {...healthCheckRating.input}
        />

        <Box mt={2} display='flex' justifyContent='space-between'>
          <Button variant='contained' color='error' onClick={handleCancel} type='button'>Cancel</Button>
          <Button variant='contained' color='primary' type='submit'>Add</Button>
        </Box>
      </form>
    </Box >
  );
};


export default EntryForm;