/** @jsx createElement */
/** @jsxFrag createFragment */
import { createElement, createFragment } from '../framework/element';
import { VehiclesOverview } from '../components/VehiclesOverview';
import { getCurrentAppLocation } from '../helpers/appLocation';

export function App() {
  let parameters = getCurrentAppLocation();
  if (parameters['view'] === 'compare') {
    return <></>;
  }
  if (parameters['view'] != 'list') {
    const url = new URL(window.location.origin + window.location.pathname);
    url.searchParams.set('view', 'list');
    window.history.pushState({}, '', url);
  }
  return <VehiclesOverview {...parameters} />;
}
