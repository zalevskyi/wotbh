import { tiers, types, rankings } from '../data/vehiclesData';

const views = ['list'];

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
  return query;
}

export function updateLocationQuery(queryList) {
  const url = new URL(window.location.origin + window.location.pathname);
  for (let [key, value] of Object.entries(queryList)) {
    url.searchParams.set(key, value);
  }
  window.history.pushState({}, '', url);
}
