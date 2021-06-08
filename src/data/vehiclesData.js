const API_URL = 'https://api.wotblitz.ru/wotb/encyclopedia/vehicles/';
const FIELDS = [
  'type',
  'tier',
  'name',
  'default_profile.hp',
  'default_profile.speed_forward',
  'default_profile.gun.dispersion',
  'default_profile.shells',
];
const LANG = 'en';

let vehiclesData = null;

export const tiers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

export const types = [
  { name: 'Light Tank', code: 'lightTank' },
  { name: 'Medium Tank', code: 'mediumTank' },
  { name: 'Heavy Tank', code: 'heavyTank' },
  { name: 'AT', code: 'AT-SPG' },
];

export function getVehiclesList(tier, type) {
  if (vehiclesData) {
    return Promise.resolve(getCachedList(tier, type));
  }
  return fetchVehiclesData().then(data => {
    return Promise.resolve(getCachedList(tier, type));
  });
}

function getCachedList(tier, type) {
  const list = [];
  for (let vehicle of Object.values(vehiclesData)) {
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

function fetchVehiclesData() {
  const url =
    API_URL +
    '?' +
    [
      `application_id=${process.env.WOTB_APP_ID}`,
      `fields=${encodeURIComponent(FIELDS.join(','))}`,
      `language=${LANG}`,
    ].join('&');
  return fetch(url)
    .then(response => {
      if (!response.ok) {
        throw Error(response.statusText);
      }
      return response.json();
    })
    .then(responseJSON => {
      vehiclesData = responseJSON.data;
      return vehiclesData;
    });
}
