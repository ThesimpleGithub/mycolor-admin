import React, { useState } from 'react';

export type changeEvent<T> = (e: React.ChangeEvent<T>) => void;
const useInput = (
  initialValue: string,
  validator?: () => void,
): [string, changeEvent<HTMLInputElement | HTMLSelectElement>] => {
  const [value, setValue] = useState(initialValue);

  const handleChange: changeEvent<HTMLInputElement | HTMLSelectElement> = e => {
    setValue(e.target.value);
  };
  return [value, handleChange];
};

export default useInput;
