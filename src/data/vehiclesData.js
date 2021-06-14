const API_URL = 'https://api.wotblitz.ru/wotb/encyclopedia/vehicles/';
const FIELDS = [
  'tank_id',
  'type',
  'tier',
  'name',
  'nation',
  'default_profile.hp',
  'default_profile.speed_forward',
  'default_profile.gun.dispersion',
  'default_profile.shells',
  'images.preview',
];
const LANG = 'en';
const allUpperNations = ['usa', 'uk', 'ussr'];

let vehiclesData = null;

export const tiers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

export const types = [
  { name: 'Light Tank', code: 'lightTank' },
  { name: 'Medium Tank', code: 'mediumTank' },
  { name: 'Heavy Tank', code: 'heavyTank' },
  { name: 'AT', code: 'AT-SPG' },
];

export const rankings = [
  { name: 'Hit points', code: 'hp' },
  { name: 'Speed', code: 'speed' },
  { name: 'Damage', code: 'damage' },
  { name: 'Dispersion', code: 'dispersion' },
];

const rankingSort = {
  hp: (a, b) => b.default_profile.hp - a.default_profile.hp,
  speed: (a, b) => b.default_profile.speed_forward - a.default_profile.speed_forward,
  damage: (a, b) => b.default_profile.shells.damage - a.default_profile.shells.damage,
  dispersion: (a, b) => a.default_profile.gun.dispersion - b.default_profile.gun.dispersion,
};

export function getVehiclesList(tier, type, ranking) {
  if (vehiclesData) {
    return Promise.resolve(getCachedList(tier, type, ranking));
  }
  return fetchVehiclesData().then(data => {
    return Promise.resolve(getCachedList(tier, type, ranking));
  });
}

export function getVehiclesCompare(tank_id) {
  return fetchVehiclesCompareData(tank_id).then(data => {
    const list = [];
    for (let vehicle of Object.values(data)) {
      vehicle.nation = nationToUpperCase(vehicle.nation);
      vehicle.type = types.filter(type => type.code == vehicle.type)[0].name; // move to separate function multiple usage
      list.push(vehicle);
    }
    return Promise.resolve(list);
  });
}

function getCachedList(tier, type, ranking) {
  const list = [];
  for (let vehicle of Object.values(vehiclesData)) {
    if (vehicle.tier == tier && vehicle.type == type) {
      list.push({
        tank_id: vehicle.tank_id,
        name: vehicle.name,
        nation: nationToUpperCase(vehicle.nation),
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
  if (rankings.some(element => element.code == ranking)) {
    list.sort(rankingSort[ranking]);
  }
  return list;
}

function fetchVehiclesData() {
  const url =
    API_URL +
    '?' + // todo
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

function fetchVehiclesCompareData(tank_id) {
  const url = new URL(API_URL);
  url.searchParams.set('application_id', process.env.WOTB_APP_ID);
  url.searchParams.set('fields', FIELDS.join(','));
  url.searchParams.set('tank_id', tank_id.join(','));
  url.searchParams.set('language', LANG);
  return fetch(url)
    .then(response => {
      if (!response.ok) {
        throw Error(response.statusText);
      }
      return response.json();
    })
    .then(responseJSON => {
      return responseJSON.data; // Extra step
    });
}

function nationToUpperCase(nation) {
  if (allUpperNations.includes(nation)) {
    return nation.toUpperCase();
  }
  return nation[0].toUpperCase() + nation.slice(1); // TODO use destructing
}
