import React from 'react';

export function VehiclesSelect({ name, value, onChange, options, optionsWithCode }) {
  const selectName = `select-${name}`.toLowerCase();
  return (
    <>
      <label htmlFor={selectName}>{name}: </label>
      <select id={selectName} value={value} onChange={({ target }) => onChange(target.value)}>
        <option value="">---</option>
        {optionsWithCode &&
          optionsWithCode.map(option => (
            <option key={option.code} value={option.code}>
              {option.name}
            </option>
          ))}
        {options &&
          options.map(option => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
      </select>
    </>
  );
}
