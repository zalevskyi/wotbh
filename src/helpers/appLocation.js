export function updateAppLocation(parameter) {
  let parameters = getCurrentAppLocation();
  for (let [key, value] of Object.entries(parameter)) {
    parameters[key] = value;
  }
  if (parameters['view'] == 'list') {
    const url = new URL(window.location.origin + window.location.pathname);
    url.searchParams.set('view', 'list');
    if (parameters['tier']) {
      url.searchParams.set('tier', parameters['tier']);
    }
    if (parameters['type']) {
      url.searchParams.set('type', parameters['type']);
    }
    window.history.pushState({}, '', url);
  }
}

export function getCurrentAppLocation() {
  let search = new URL(window.location).searchParams;
  let parameters = {};
  for (let [key, value] of search.entries()) {
    parameters[key] = value;
  }
  return parameters;
}
