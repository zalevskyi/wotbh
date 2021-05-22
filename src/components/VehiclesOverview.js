/** @jsx createElement */
/** @jsxFrag createFragment */
import { createElement, createFragment } from '../framework/element';
import { VehiclesSelectTier } from './VehiclesSelectTier';
import { VehiclesSelectType } from './VehiclesSelectType';
import { VehiclesTable } from './VehiclesTable';

export function VehiclesOverview({ tier, type }) {
  return (
    <>
      <VehiclesSelectTier tier={tier} />
      <VehiclesSelectType type={type} />
      <VehiclesTable tier={tier} type={type} />
    </>
  );
}
