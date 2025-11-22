import React, { useState } from "react";


export const useField = (type: string) => {
  const [value, setValue] = useState<string>('');

  const onChange = (event: React.ChangeEvent<HTMLInputElement>) =>
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

  const add = (value: string) =>
    setValues(prev => [...prev, value]);

  const remove = (value: string) =>
    setValues(values.filter(v => v !== value));

  const reset = () =>
    setValues([]);


  return {
    values,
    add,
    remove,
    reset
  };
};