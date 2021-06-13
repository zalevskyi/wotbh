import { tiers, types, rankings } from '../data/vehiclesData';

const views = ['list', 'compare'];

export function getCurrentQuery() {
  const search = new URL(window.location).searchParams;
  const view = views.includes(search.get('view')) ? search.get('view') : views[0];
  const query = {};
  query[view] = {};
  if (view == 'list') {
    const tier = Number(search.get('tier'));
    const type = search.get('type');
    const ranking = search.get('ranking');
    if (tiers.includes(tier)) {
      query['list']['tier'] = tier;
    }
    if (types.some(element => element.code == type)) {
      query['list']['type'] = type;
    }
    if (rankings.some(element => element.code == ranking)) {
      query['list']['ranking'] = ranking;
    }
  }
  if (view == 'compare') {
    let tank_id = search.get('tank_id');
    if (tank_id) {
      tank_id = tank_id.split(',').map(id => Number(id));
      if (tank_id.length == 2 && tank_id[0] && tank_id[1]) {
        query['compare']['tank_id'] = tank_id;
      }
    }
    if (!query.compare.tank_id) {
      query['list'] = {};
      delete query['compare'];
    }
  }
  return query;
}

export function updateLocationQuery(queryList) {
  const url = new URL(window.location.origin + window.location.pathname);
  for (let [key, value] of Object.entries(queryList)) {
    url.searchParams.set(key, value);
  }
  window.history.pushState({}, '', url);
  if (queryList.tier && queryList.type) {
    document.title = `WoT Blitz Helper: Tier ${queryList.tier} - ${
      types.filter(type => type.code == queryList.type)[0].name
    }`;
  } else {
    document.title = 'WoT Blitz Helper';
  }
}

export function getCompareLink(compareSet) {
  const url = new URL(window.location.origin + window.location.pathname);
  const tank_ids = [];
  for (let value of compareSet.values()) {
    tank_ids.push(value);
  }
  url.searchParams.set('view', 'compare');
  url.searchParams.set('tank_id', tank_ids.join(','));
  return url;
}
