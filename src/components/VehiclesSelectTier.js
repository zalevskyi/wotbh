/** @jsx createElement */
/** @jsxFrag createFragment */
import { createElement, createFragment } from '../framework/element';

const tiers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

export function VehiclesSelectTier({ tier: selectedTier }) {
  return (
    <>
      <label for="select-tier">Tier: </label>
      <select
        id="select-tier"
        onchange={({ target }) => window.updateVehiclesList({ tier: target.value })}
      >
        <option value="">---</option>
        {tiers.map(tier => (
          <option value={tier} selected={tier == selectedTier}>
            {tier}
          </option>
        ))}
      </select>
    </>
  );
}
