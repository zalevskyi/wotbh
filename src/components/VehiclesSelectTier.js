/** @jsx createElement */
/** @jsxFrag createFragment */
import { createElement, createFragment } from '../framework';
import { tiers } from '../data/vehiclesData';

export function VehiclesSelectTier({ currentTier, setCurrentTier }) {
  return (
    <>
      <label for="select-tier">Tier: </label>
      <select id="select-tier" onchange={({ target }) => setCurrentTier(Number(target.value))}>
        <option value="">---</option>
        {tiers.map(tier => (
          <option value={tier} selected={tier == currentTier}>
            {tier}
          </option>
        ))}
      </select>
    </>
  );
}
