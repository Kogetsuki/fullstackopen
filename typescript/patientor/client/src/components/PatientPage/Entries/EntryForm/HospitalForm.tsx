import { TextField } from "@mui/material";
import { UseField } from "../../../../types";

interface Props {
  dischargeDate: UseField;
  dischargeCriteria: UseField;
}


const HospitalForm = ({ dischargeDate, dischargeCriteria }: Props) => (
  <>
    <TextField
      fullWidth
      label='Discharge date'
      margin='normal'
      InputLabelProps={{ shrink: true }}
      {...dischargeDate.input}
    />

    <TextField
      fullWidth
      label='Discharge criteria'
      margin='normal'
      InputLabelProps={{ shrink: true }}
      {...dischargeCriteria.input}
    />
  </>
);


export default HospitalForm;