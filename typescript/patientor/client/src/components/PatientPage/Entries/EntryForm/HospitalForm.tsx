import { Box, TextField, Typography } from "@mui/material";
import { UseField } from "../../../../types";

interface Props {
  dischargeDate: UseField;
  dischargeCriteria: UseField;
}


const HospitalForm = ({ dischargeDate, dischargeCriteria }: Props) => (
  <>
    <Box mt={2} mb={1}>
      <Typography variant='subtitle2'>
        Discharge
      </Typography>
    </Box>

    <Box display='flex' gap={5}>
      <TextField
        fullWidth
        label='Date'
        margin='normal'
        InputLabelProps={{ shrink: true }}
        {...dischargeDate.input}
      />

      <TextField
        fullWidth
        label='Criteria'
        margin='normal'
        InputLabelProps={{ shrink: true }}
        {...dischargeCriteria.input}
      />
    </Box>
  </>
);


export default HospitalForm;