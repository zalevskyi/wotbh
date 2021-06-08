/** @jsx createElement */
/** @jsxFrag createFragment */
import { createElement, createFragment } from '../framework';
import { types } from '../data/vehiclesData';

export function VehiclesSelectType({ currentType, setCurrentType }) {
  return (
    <>
      <label for="select-type">Type: </label>
      <select id="select-type" onchange={({ target }) => setCurrentType(target.value)}>
        <option value="">---</option>
        {types.map(type => (
          <option value={type.code} selected={type.code === currentType}>
            {type.name}
          </option>
        ))}
      </select>
    </>
  );
}
