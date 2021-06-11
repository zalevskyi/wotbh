import React from 'react';
import { useList } from '../customHooks';
import { VehiclesSelectTier } from './VehiclesSelectTier';
import { VehiclesSelectType } from './VehiclesSelectType';
import { VehiclesSelectRanking } from './VehiclesSelectRanking';
import { VehiclesTable } from './VehiclesTable';

export function VehiclesOverview({ queryList }) {
  const {
    currentTier,
    setCurrentTier,
    currentType,
    setCurrentType,
    currentRanking,
    setCurrentRanking,
    error,
    isLoading,
    listData,
  } = useList(queryList);
  return (
    <>
      <VehiclesSelectTier value={currentTier} onChange={setCurrentTier} />
      <VehiclesSelectType value={currentType} onChange={setCurrentType} />
      {listData && listData.length > 0 ? (
        <VehiclesSelectRanking value={currentRanking} onChange={setCurrentRanking} />
      ) : (
        <></>
      )}
      <VehiclesTable listData={listData} error={error} isLoading={isLoading} />
    </>
  );
}
