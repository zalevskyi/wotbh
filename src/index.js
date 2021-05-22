import { App } from './components/App';
import { renderApp } from './framework/render';
import { updateAppLocation } from './helpers/appLocation';
import { updateVehiclesList } from './data/vehiclesData';

window.renderApp = renderApp;
window.updateAppLocation = updateAppLocation;
window.updateVehiclesList = updateVehiclesList;
window.dataStore = {
  isDataLoading: false,
  error: null,
};

renderApp(App, document.getElementById('app-root'));
updateAppLocation({});
