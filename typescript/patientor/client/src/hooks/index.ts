import { SelectChangeEvent } from "@mui/material";
import React, { useState } from "react";


export const useField = (type: string) => {
  const [value, setValue] = useState<string>('');

  const onChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement> | SelectChangeEvent<string>
  ) =>
    setValue(event.target.value);

  const reset = () =>
    setValue('');


  return {
    input: {
      type,
      value,
      onChange
    },
    value,
    reset
  };
};


export const useMultiField = () => {
  const [values, setValues] = useState<string[]>([]);

  const onChange = (
    event: SelectChangeEvent<string[]>
  ) => {
    const { target: { value } } = event;
    setValues(typeof value === 'string' ? value.split(',') : value);
  };

  const reset = () =>
    setValues([]);


  return {
    input: {
      value: values,
      onChange
    },
    values,
    reset
  };
};