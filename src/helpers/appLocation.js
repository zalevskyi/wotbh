export function updateAppLocation(parameter) {
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

export function getCurrentAppLocation() {
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
