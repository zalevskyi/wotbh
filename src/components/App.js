import React from 'react';
import { VehiclesOverview } from '../components/VehiclesOverview';
import { VehiclesCompare } from '../components/VehiclesCompare';
import { getCurrentQuery } from '../helpers/appLocation';

export function App() {
  const query = getCurrentQuery();
  if (query.list) {
    return <VehiclesOverview queryList={query.list} />;
  }
  if (query.compare) {
    return <VehiclesCompare queryCompare={query.compare} />;
  }
}
