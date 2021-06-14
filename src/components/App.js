import React from 'react';
import { VehiclesOverview } from './VehiclesOverview';
import { VehiclesCompare } from '../components/VehiclesCompare'; // could be shortened
import { getCurrentQuery } from '../helpers/appLocation';

export function App() {
  const query = getCurrentQuery()  || {};
  if (query.list) {
    return <VehiclesOverview queryList={query.list} queryCompare={query.compare} />;
  }
  if (query.compare) {
    return <VehiclesCompare queryCompare={query.compare} />; // TODO
  }
}
