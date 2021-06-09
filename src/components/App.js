/** @jsx createElement */
/** @jsxFrag createFragment */
import { createElement } from '../framework';
import { VehiclesOverview } from '../components/VehiclesOverview';
import { getCurrentQuery } from '../helpers/appLocation';

export function App(s) {
  const query = getCurrentQuery();
  if (query.list) {
    return <VehiclesOverview queryList={query.list} />;
  }
}
