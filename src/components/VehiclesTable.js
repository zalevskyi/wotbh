import { vehiclesList } from '../data/vehiclesData';

export function VehiclesTable(parameters) {
  let vehicle_list = vehiclesList(parameters);
  let table =
    `<table><thead><tr>` +
    `<th>Name</th><th>Hit points</th><th>Speed</th><th>Damage</th><th>Dispersion</th>` +
    `</tr></thead><tbody>`;
  table += vehicle_list
    .map(
      vehicle =>
        `<tr>` +
        `<td>${vehicle.name}</td>` +
        `<td>${vehicle.default_profile.hp}</td>` +
        `<td>${vehicle.default_profile.speed_forward}</td>` +
        `<td>${vehicle.default_profile.shells.damage}</td>` +
        `<td>${vehicle.default_profile.gun.dispersion}</td>` +
        `</tr >`,
    )
    .join('');
  table += `</tbody></table>`;
  return table;
}
