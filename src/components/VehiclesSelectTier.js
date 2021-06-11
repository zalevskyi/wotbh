import React from 'react';
import { tiers } from '../data/vehiclesData';

export function VehiclesSelectTier({ value, onChange }) {
  return (
    <>
      <label htmlFor="select-tier">Tier: </label>
      <select
        id="select-tier"
        value={value}
        onChange={({ target }) => onChange(Number(target.value))}
      >
        <option value="">---</option>
        {tiers.map(tier => (
          <option key={tier} value={tier}>
            {tier}
          </option>
        ))}
      </select>
    </>
  );
}
