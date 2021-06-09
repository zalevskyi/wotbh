/** @jsx createElement */
/** @jsxFrag createFragment */
import { createElement } from '../framework';

export function VehiclesTable({ listData, error, isLoading }) {
  if (error != null) {
    return <p>{error}</p>;
  }
  if (isLoading) {
    return <p>Please wait. Loading data ...</p>;
  }
  if (!listData) {
    return <p>Please select Tier and Type</p>;
  }
  if (listData.length == 0) {
    return <p>There are no vehicles for selected tier and type. Try another one</p>;
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
        {listData.map(vehicle => (
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
