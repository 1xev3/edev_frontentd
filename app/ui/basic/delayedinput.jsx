import React, { useState, useEffect } from "react";

export default function DelayedInput({ delay, callback, value, defaultValue = '', ...other }) {
  const [val, setVal] = useState(value || defaultValue);

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      if (val !== value) {
        callback({'value':val, ...other});
      }
    }, delay);

    return () => clearTimeout(delayDebounceFn);
  }, [val, value, delay, callback]);

  useEffect(() => {
    setVal(value || defaultValue);
  }, [value, defaultValue]);

  return (
    <input
      type='text'
      autoComplete='off'
      value={val}
      onChange={(e) => setVal(e.target.value)}
      {...other}
    />
  );
}