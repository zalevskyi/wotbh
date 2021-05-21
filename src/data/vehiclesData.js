import { updateAppLocation, getCurrentAppLocation } from '../helpers/appLocation';

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

export function vehiclesList({ tier, type }) {
  let list = [];
  if (vehiclesData) {
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
  } else {
    // In case of visiting page via direct saved link with selected tier and type
    // It is needed to fetch data here
    if (tier && type) {
      window.dataStore.error = null;
      window.dataStore.isDataLoading = true;
      fetchVehiclesData()
        .then(({ error, data }) => {
          window.dataStore.isDataLoading = false;
          if (error) {
            window.dataStore.error = error;
          }
        })
        .catch(err => {
          window.dataStore.error = 'Some error occurred.';
        })
        .finally(window.renderApp);
    }
  }
  return list;
}

export function updateVehiclesList(parameter) {
  updateAppLocation(parameter);
  const { parameters } = getCurrentAppLocation();
  if (parameters.tier && parameters.type) {
    window.dataStore.error = null;
    window.dataStore.isDataLoading = true;
    window.renderApp();
    fetchVehiclesData()
      .then(({ error, data }) => {
        window.dataStore.isDataLoading = false;
        if (error) {
          window.dataStore.error = error;
        }
      })
      .catch(err => {
        window.dataStore.error = 'Some error occurred.';
      })
      .finally(window.renderApp);
  }
}

function fetchVehiclesData() {
  if (vehiclesData) {
    return Promise.resolve({});
  }
  let url =
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
      return {};
    });
}
