/** @jsx createElement */
/** @jsxFrag createFragment */
import { createElement, createFragment } from '../framework/element';
import { VehiclesSelectTier } from './VehiclesSelectTier';
import { VehiclesSelectType } from './VehiclesSelectType';
import { VehiclesTable } from './VehiclesTable';

export function VehiclesOverview({
  currentTier,
  setCurrentTier,
  currentType,
  setCurrentType,
  error,
  isLoading,
  listData,
}) {
  return (
    <>
      <VehiclesSelectTier currentTier={currentTier} setCurrentTier={setCurrentTier} />
      <VehiclesSelectType currentType={currentType} setCurrentType={setCurrentType} />
      <VehiclesTable listData={listData} error={error} isLoading={isLoading} />
    </>
  );
}
