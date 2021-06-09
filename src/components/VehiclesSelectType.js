import React from 'react';
import { types } from '../data/vehiclesData';

export function VehiclesSelectType({ currentType, setCurrentType }) {
  return (
    <>
      <label htmlFor="select-type">Type: </label>
      <select
        id="select-type"
        value={currentType}
        onChange={({ target }) => setCurrentType(target.value)}
      >
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
