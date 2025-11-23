import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import { HealthCheckRating, UseField } from "../../../../types";
import { ReactNode } from "react";


interface Props {
  healthCheckRating: UseField;
}


const HealthCheckForm = ({ healthCheckRating }: Props) => {
  const formatLabel = (label: string) =>
    label.replace(/([A-Z])/g, ' $1').trim();


  const renderRatingMenuItems = (): ReactNode =>
    Object.keys(HealthCheckRating)
      .filter(key => isNaN(Number(key)))
      .map(key =>
        <MenuItem
          key={key}
          value={HealthCheckRating[key as keyof typeof HealthCheckRating]}
        >
          {formatLabel(key)}
        </MenuItem>
      );


  return (
    <>
      <FormControl fullWidth margin='normal' variant='outlined'>
        <InputLabel shrink>HealthCheck Rating</InputLabel>
        <Select
          label='HealthCheck Rating'
          displayEmpty
          {...healthCheckRating.input}
        >
          {renderRatingMenuItems()}
        </Select>
      </FormControl>
    </>
  );
};


export default HealthCheckForm;