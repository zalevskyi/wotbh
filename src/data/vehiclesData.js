import { response } from './vehiclesDataMockup';

export function vehiclesList({ tier, type }) {
  let list = [];
  for (let vehicle of Object.values(response.data)) {
    if (vehicle.tier == tier && vehicle.type == type) {
      list.push({
        name: vehicle.name,
        default_profile: {
          hp: vehicle.default_profile.hp,
          speed_forward: vehicle.default_profile.speed_forward,
          gun: {
            dispersion: vehicle.default_profile.gun.dispersion,
          },
          shells: {
            damage: vehicle.default_profile.shells[0].damage,
          },
        },
      });
    }
  }
  return list;
}
