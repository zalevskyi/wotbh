import React from 'react';
import { VehiclesOverview } from '../components/VehiclesOverview';
import { getCurrentQuery } from '../helpers/appLocation';

export function App() {
  const query = getCurrentQuery();
  if (query.list) {
    return <VehiclesOverview queryList={query.list} />;
  }
}
