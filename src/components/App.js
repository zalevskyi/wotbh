/** @jsx createElement */
/** @jsxFrag createFragment */
import { createElement, createFragment } from '../framework/element';
import { VehiclesOverview } from '../components/VehiclesOverview';
import { getCurrentAppLocation } from '../helpers/appLocation';

export function App() {
  let view, parameters;
  ({ view, parameters } = getCurrentAppLocation());
  if (view === '?compare') {
    return <></>;
  }
  if (view != '?list') {
    window.history.pushState('', '', window.location.origin + '/?list');
  }
  return <VehiclesOverview {...parameters} />;
}
