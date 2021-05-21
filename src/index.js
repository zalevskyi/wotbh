import { renderApp } from './framework/render';
import { updateAppLocation } from './helpers/appLocation';

window.renderApp = renderApp;
window.updateAppLocation = updateAppLocation;

renderApp();
updateAppLocation({});
