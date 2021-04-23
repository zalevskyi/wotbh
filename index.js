import { response } from './server_response_mockup';

window.renderApp = renderApp;
window.updateAppLocation = updateAppLocation;
let types = [
  { name: 'Light Tank', code: 'lightTank' },
  { name: 'Medium Tank', code: 'mediumTank' },
  { name: 'Heavy Tank', code: 'heavyTank' },
  { name: 'AT', code: 'AT-SPG' },
];
let tiers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

renderApp();
updateAppLocation({});

function renderApp() {
  let view, parameters;
  ({ view, parameters } = getCurrentAppLocation());
  if (view === '?list') {
    document.getElementById('app-root').innerHTML = listApp(parameters);
  } else if (view === '?compare') {
    document.getElementById('app-root').innerHTML = 'compareApp(parameters)';
  } else {
    window.history.pushState('', '', window.location.origin + '/?list');
    renderApp();
  }
}

function updateAppLocation(parameter) {
  let view, parameters;
  ({ view, parameters } = getCurrentAppLocation());
  for (let [key, value] of Object.entries(parameter)) {
    parameters[key] = value;
  }
  if (view == '?list') {
    window.history.pushState(
      '',
      '',
      window.location.origin +
        '/?list' +
        (parameters['tier'] ? `&tier=${parameters['tier']}` : ``) +
        (parameters['type'] ? `&type=${parameters['type']}` : ``),
    );
  }
}

function getCurrentAppLocation() {
  let search_array = decodeURIComponent(window.location.search).split('&');
  let parameters = {};
  search_array.forEach(search_element => {
    let key, value;
    [key, value] = search_element.split('=');
    if (value) {
      parameters[key] = value;
    }
  });
  return { view: search_array[0], parameters: parameters };
}

function listApp(parameters) {
  let view = listFilterTier(parameters['tier']) + listFilterType(parameters['type']);
  if (parameters['tier'] && parameters['type']) {
    view += listTable(parameters);
  }
  return view;
}

function listFilterTier(selected) {
  return (
    `<label for='select-tier'>Tier: </label>` +
    `<select id='select-tier' onchange='` +
    `window.updateAppLocation({tier:this.value}); window.renderApp();` +
    `'>` +
    `<option value=''>---</value>` +
    tiers.map(tier => `<option ${selected == tier ? 'selected' : ''}>${tier}</option>`).join('') +
    `</select >`
  );
}

function listFilterType(selected) {
  return (
    `<label for='select-type'>Type: </label>` +
    `<select id='select-type' onchange='` +
    `window.updateAppLocation({type:this.value}); window.renderApp();` +
    `'>` +
    `<option value=''>---</value>` +
    types
      .map(
        type =>
          `<option value=${type.code} ${selected == type.code ? 'selected' : ''}>${
            type.name
          }</option>`,
      )
      .join('') +
    `</select >`
  );
}

function listTable(parameters) {
  let vehicle_list = fetchList(parameters);
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

function fetchList({ tier, type }) {
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
