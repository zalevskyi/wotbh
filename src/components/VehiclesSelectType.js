/** @jsx createElement */
/** @jsxFrag createFragment */
import { createElement, createFragment } from '../framework/element';

const types = [
  { name: 'Light Tank', code: 'lightTank' },
  { name: 'Medium Tank', code: 'mediumTank' },
  { name: 'Heavy Tank', code: 'heavyTank' },
  { name: 'AT', code: 'AT-SPG' },
];

export function VehiclesSelectType({ type: selectedType }) {
  return (
    <>
      <label for="select-type">Type: </label>
      <select
        id="select-type"
        onchange={({ target }) => window.updateVehiclesList({ type: target.value })}
      >
        <option value="">---</option>
        {types.map(type => (
          <option value={type.code} selected={type.code === selectedType}>
            {type.name}
          </option>
        ))}
      </select>
    </>
  );
}
