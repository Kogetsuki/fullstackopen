import React, { useState } from "react";


export const useField = (type: string) => {
  const [value, setValue] = useState('');

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


export const useRadio = <T extends string>(name: string, options: readonly T[]) => {
  const [value, setValue] = useState<T | ''>('');

  const onChange = (event: React.ChangeEvent<HTMLInputElement>) =>
    setValue(event.target.value as T);

  const reset = () =>
    setValue('');

  const inputs = options.map(option => ({
    id: `${name}-${option}`,
    type: 'radio' as const,
    name,
    value: option,
    checked: value === option,
    onChange
  }));


  return {
    value,
    options,
    inputs,
    reset
  };
};