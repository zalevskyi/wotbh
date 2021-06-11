import React from 'react';
import { types } from '../data/vehiclesData';

export function VehiclesSelectType({ value, onChange }) {
  return (
    <>
      <label htmlFor="select-type">Type: </label>
      <select id="select-type" value={value} onChange={({ target }) => onChange(target.value)}>
        <option value="">---</option>
        {types.map(type => (
          <option key={type.code} value={type.code}>
            {type.name}
          </option>
        ))}
      </select>
    </>
  );
}
