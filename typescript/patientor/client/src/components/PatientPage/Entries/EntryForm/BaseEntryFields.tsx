import { Checkbox, FormControl, InputLabel, ListItemText, MenuItem, Select, TextField } from "@mui/material";
import { UseField, UseMultiField } from "../../../../types";
import { getDiagnoses } from "../../../../selectors/diagnoseSelectors";
import { ReactNode } from "react";


interface Props {
  description: UseField,
  date: UseField,
  specialist: UseField,
  diagnosisCodes: UseMultiField;
}


const BaseEntryFields = ({ description, date, specialist, diagnosisCodes }: Props) => {
  const renderDiagnosisCodesMenuItems = (): ReactNode =>
    getDiagnoses().map(d =>
      <MenuItem key={d.code} value={d.code}>
        <Checkbox checked={diagnosisCodes.values.includes(d.code)} />
        <ListItemText primary={d.code} />
      </MenuItem>
    );


  return (
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

      <FormControl fullWidth margin='normal' variant='outlined'>
        <InputLabel shrink>Diagnosis Codes</InputLabel>
        <Select
          label='Diagnosis Code'
          displayEmpty
          multiple
          renderValue={(selected) => (selected as string[]).join(', ')}
          {...diagnosisCodes.input}
        >
          {renderDiagnosisCodesMenuItems()}
        </Select>
      </FormControl>
    </>
  );
};

export default BaseEntryFields;