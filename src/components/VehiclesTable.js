/** @jsx createElement */
/** @jsxFrag createFragment */
import { createElement, createFragment } from '../framework/element';
import { vehiclesList } from '../data/vehiclesData';

export function VehiclesTable({ tier, type }) {
  let vehicle_list = vehiclesList({ tier, type });
  const { isDataLoading, error } = window.dataStore;
  if (error != null) {
    return <p>{error}</p>;
  }
  if (isDataLoading) {
    return <p>Please wait. Loading data ...</p>;
  }
  if (vehicle_list.length == 0) {
    return <p>Please select Tier and Type</p>;
  }

  return (
    <table>
      <thead>
        <tr>
          <th>Name</th>
          <th>Hit points</th>
          <th>Speed</th>
          <th>Damage</th>
          <th>Dispersion</th>
        </tr>
      </thead>
      <tbody>
        {vehicle_list.map(vehicle => (
          <tr>
            <td>{vehicle.name}</td>
            <td>{vehicle.default_profile.hp}</td>
            <td>{vehicle.default_profile.speed_forward}</td>
            <td>{vehicle.default_profile.shells.damage}</td>
            <td>{vehicle.default_profile.gun.dispersion}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
