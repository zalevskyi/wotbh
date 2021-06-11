import React from 'react';
import { useList } from '../customHooks';
import { VehiclesSelectTier } from './VehiclesSelectTier';
import { VehiclesSelectType } from './VehiclesSelectType';
import { VehiclesSelectRanking } from './VehiclesSelectRanking';
import { VehiclesTable } from './VehiclesTable';
import { VehiclesCompareLink } from './VehiclesCompareLink';

export function VehiclesOverview({ queryList }) {
  const {
    currentTier,
    setCurrentTier,
    currentType,
    setCurrentType,
    currentRanking,
    setCurrentRanking,
    currentCompareSet,
    setCurrentCompareSet,
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
      {currentCompareSet.size == 2 ? (
        <div>
          <VehiclesCompareLink compareSet={currentCompareSet} listData={listData} />
        </div>
      ) : (
        <></>
      )}
      <VehiclesTable
        listData={listData}
        compareSet={currentCompareSet}
        setCompareSet={setCurrentCompareSet}
        error={error}
        isLoading={isLoading}
      />
    </>
  );
}
