import { TextField } from "@mui/material";
import { UseField } from "../../../../types";


interface Props {
  employerName: UseField;
  sickLeaveStart: UseField;
  sickLeaveEnd: UseField;
}


const OccupationalForm = ({ employerName, sickLeaveStart, sickLeaveEnd }: Props) => (
  <>
    <TextField
      fullWidth
      label='Employer Name'
      margin='normal'
      InputLabelProps={{ shrink: true }}
      {...employerName.input}
    />

    <TextField
      fullWidth
      label='Sick leave start'
      margin='normal'
      InputLabelProps={{ shrink: true }}
      {...sickLeaveStart.input}
    />

    <TextField
      fullWidth
      label='Sick leave end'
      margin='normal'
      InputLabelProps={{ shrink: true }}
      {...sickLeaveEnd.input}
    />
  </>
);


export default OccupationalForm;