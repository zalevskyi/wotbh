import { tiers, types, rankings, getTypeName } from '../data/vehiclesData';

const views = ['list', 'compare'];

export function getCurrentQuery() {
  const search = new URL(window.location).searchParams;
  const view = views.includes(search.get('view')) ? search.get('view') : views[0];
  const query = {};
  query[view] = {};
  const { list, compare } = query;
  if (list) {
    const tier = Number(search.get('tier'));
    const type = search.get('type');
    const ranking = search.get('ranking');
    if (tiers.includes(tier)) {
      list['tier'] = tier;
    }
    if (types.some(element => element.code == type)) {
      list['type'] = type;
    }
    if (rankings.some(element => element.code == ranking)) {
      list['ranking'] = ranking;
    }
  }
  if (compare) {
    let tank_id = search.get('tank_id');
    if (tank_id) {
      tank_id = tank_id.split(',').map(id => Number(id));
      const [first, second] = tank_id;
      if (first && second) {
        compare['tank_id'] = [first, second];
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
  const url = new URL(window.location.href);
  url.search = '';
  for (let [key, value] of Object.entries(queryList)) {
    if (value) {
      url.searchParams.set(key, value);
    }
  }
  window.history.pushState({}, '', url);
  if (queryList.tier && queryList.type) {
    document.title = `WoT Blitz Helper: Tier ${queryList.tier} - ${getTypeName(queryList.type)}`;
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
