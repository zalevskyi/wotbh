import React from 'react';
import { VehiclesOverview } from './VehiclesOverview';
import { VehiclesCompare } from './VehiclesCompare';
import { getCurrentQuery } from '../helpers/appLocation';

export function App() {
  const { list, compare } = getCurrentQuery();
  return (
    <>
      {list && <VehiclesOverview query={list} />}
      {compare && <VehiclesCompare query={compare} />}
    </>
  );
}
