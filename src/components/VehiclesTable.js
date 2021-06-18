import React from 'react';
import { vehiclesToCompare } from '../data/vehiclesData';

export function VehiclesTable({
  listData,
  compareSet,
  setCompareSet,
  error,
  isLoading,
  toggleCompare,
}) {
  if (error != null) {
    return <p>{error}</p>;
  }
  if (isLoading) {
    return <p>Please wait. Loading data ...</p>;
  }
  if (!listData) {
    return <p>Please select Tier and Type</p>;
  }
  if (listData.length === 0) {
    return <p>There are no vehicles for selected tier and type. Try another one</p>;
  }

  return (
    <table>
      <thead>
        <tr>
          <th>Name</th>
          <th>Nation</th>
          <th>Hit points</th>
          <th>Speed</th>
          <th>Damage</th>
          <th>Dispersion</th>
          <th>Compare</th>
        </tr>
      </thead>
      <tbody>
        {listData.map(vehicle => (
          <tr key={vehicle.tank_id}>
            <td>{vehicle.name}</td>
            <td>{vehicle.nation}</td>
            <td>{vehicle.defaultProfile.hp}</td>
            <td>{vehicle.defaultProfile.speedForward}</td>
            <td>{vehicle.defaultProfile.shells[0].damage}</td>
            <td>{vehicle.defaultProfile.gun.dispersion}</td>
            <td>
              <input
                type="checkbox"
                value={vehicle.tank_id}
                disabled={compareSet.size === vehiclesToCompare && !compareSet.has(vehicle.tank_id)}
                checked={compareSet.has(vehicle.tank_id)}
                onChange={toggleCompare}
              ></input>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
