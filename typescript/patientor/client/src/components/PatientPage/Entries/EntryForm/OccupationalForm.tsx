import { Box, TextField, Typography } from "@mui/material";
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

    <Box mt={2} mb={1}>
      <Typography variant='subtitle2'>
        Sick Leave
      </Typography>
    </Box>

    <Box display='flex' gap={5}>
      <TextField
        fullWidth
        label='Start'
        margin='normal'
        InputLabelProps={{ shrink: true }}
        {...sickLeaveStart.input}
      />

      <TextField
        fullWidth
        label='End'
        margin='normal'
        InputLabelProps={{ shrink: true }}
        {...sickLeaveEnd.input}
      />
    </Box>
  </>
);


export default OccupationalForm;