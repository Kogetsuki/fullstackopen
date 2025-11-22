import { TextField } from "@mui/material";
import { UseField } from "../../../../types";


interface Props {
  healthCheckRating: UseField;
}


const HealthCheckForm = ({ healthCheckRating }: Props) => (
  <TextField
    fullWidth
    label='HealthCheck Rating'
    inputProps={{ min: 0, max: 3 }}
    margin='normal'
    InputLabelProps={{ shrink: true }}
    {...healthCheckRating.input}
  />
);


export default HealthCheckForm;