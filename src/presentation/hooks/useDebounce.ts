import {useEffect, useState} from 'react';

export const useDebounce = (input = '', time = 500) => {
  const [value, setValue] = useState(input);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setValue(input);
    }, time);

    return () => {
      clearTimeout(timeout);
    };
  }, [input]);

  return {
    value,
  };
};
