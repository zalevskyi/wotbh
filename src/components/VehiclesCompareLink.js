import React from 'react';
import { getCompareLink } from '../helpers/appLocation';

export function VehiclesCompareLink({ compareSet, listData }) {
  const compareList = listData
    .filter(vehicle => compareSet.has(vehicle.tank_id))
    .map(vehicle => `${vehicle.name} (${vehicle.nation})`);
  return (
    <>
      Compare: <a href={getCompareLink(compareSet)}>{compareList.join(' vs. ')}</a>
    </>
  );
}
