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

export const vehiclesToCompare = 2;

const rankingSort = {
  hp: (a, b) => b.defaultProfile.hp - a.defaultProfile.hp,
  speed: (a, b) => b.defaultProfile.speedForward - a.defaultProfile.speedForward,
  damage: (a, b) => b.defaultProfile.shells[0].damage - a.defaultProfile.shells[0].damage,
  dispersion: (a, b) => a.defaultProfile.gun.dispersion - b.defaultProfile.gun.dispersion,
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
      list.push(vehicle);
    }
    for (let vehicle of list) {
      vehicle.nation = nationCapitalize(vehicle.nation);
      vehicle.type = getTypeName(vehicle.type);
    }
    return Promise.resolve(list);
  });
}

export function getTypeName(typeCode) {
  for (let type of types) {
    if (type.code === typeCode) {
      return type.name;
    }
  }
}

function getCachedList(tier, type, ranking) {
  const list = [];
  for (let vehicle of Object.values(vehiclesData)) {
    if (vehicle.tier == tier && vehicle.type == type) {
      list.push(vehicle);
    }
  }
  for (let vehicle of list) {
    vehicle.nation = nationCapitalize(vehicle.nation);
  }
  if (rankings.some(element => element.code == ranking)) {
    list.sort(rankingSort[ranking]);
  }
  return list;
}

function fetchVehiclesData() {
  const url = new URL(API_URL);
  url.searchParams.set('application_id', process.env.WOTB_APP_ID);
  url.searchParams.set('fields', FIELDS.join(','));
  url.searchParams.set('language', LANG);
  return fetch(url)
    .then(response => {
      if (!response.ok) {
        throw Error(response.statusText);
      }
      return response.json();
    })
    .then(responseJSON => {
      vehiclesData = responseJSON.data;
      renameCamelCaseInPlace(vehiclesData);
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
      renameCamelCaseInPlace(responseJSON.data);
      return responseJSON.data;
    });
}

function nationCapitalize(nation) {
  if (allUpperNations.includes(nation)) {
    return nation.toUpperCase();
  }
  return capitalize(nation);
}

function capitalize(str) {
  return str[0].toUpperCase() + str.slice(1);
}

function renameCamelCaseInPlace(apiData) {
  for (let vehicle of Object.values(apiData)) {
    vehicle.defaultProfile = vehicle.default_profile;
    vehicle.defaultProfile.speedForward = vehicle.defaultProfile.speed_forward;
    delete vehicle.default_profile;
    delete vehicle.defaultProfile.speed_forward;
  }
}
