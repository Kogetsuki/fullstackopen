import { TextField } from "@mui/material";
import { UseField } from "../../../../types";


interface Props {
  description: UseField,
  date: UseField,
  specialist: UseField,
  diagnosisCodes: UseField;
}


const BaseEntryFields = ({ description, date, specialist, diagnosisCodes }: Props) => (
  <>
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
  </>
);


export default BaseEntryFields;