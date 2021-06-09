import React from 'react';
import { useList } from '../customHooks';
import { VehiclesSelectTier } from './VehiclesSelectTier';
import { VehiclesSelectType } from './VehiclesSelectType';
import { VehiclesTable } from './VehiclesTable';

export function VehiclesOverview({ queryList }) {
  const {
    currentTier,
    setCurrentTier,
    currentType,
    setCurrentType,
    error,
    isLoading,
    listData,
  } = useList(queryList);
  return (
    <>
      <VehiclesSelectTier currentTier={currentTier} setCurrentTier={setCurrentTier} />
      <VehiclesSelectType currentType={currentType} setCurrentType={setCurrentType} />
      <VehiclesTable listData={listData} error={error} isLoading={isLoading} />
    </>
  );
}
