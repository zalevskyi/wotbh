import { VehiclesOverview } from '../components/VehiclesOverview';
import { getCurrentAppLocation } from '../helpers/appLocation';

export function renderApp() {
  let view, parameters;
  ({ view, parameters } = getCurrentAppLocation());
  if (view === '?list') {
    document.getElementById('app-root').innerHTML = VehiclesOverview(parameters);
  } else if (view === '?compare') {
    document.getElementById('app-root').innerHTML = 'compareApp(parameters)';
  } else {
    window.history.pushState('', '', window.location.origin + '/?list');
    renderApp();
  }
}
