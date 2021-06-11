import React from 'react';
import { rankings } from '../data/vehiclesData';

export function VehiclesSelectRanking({ value, onChange }) {
  return (
    <>
      <label htmlFor="select-ranking">Ranking: </label>
      <select id="select-ranking" value={value} onChange={({ target }) => onChange(target.value)}>
        <option value="">---</option>
        {rankings.map(ranking => (
          <option key={ranking.code} value={ranking.code}>
            {ranking.name}
          </option>
        ))}
      </select>
    </>
  );
}
