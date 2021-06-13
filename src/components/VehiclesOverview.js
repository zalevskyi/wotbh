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
      <h1>WoT Blitz Vehicles</h1>
      <h2>Category selection</h2>
      <VehiclesSelectTier value={currentTier} onChange={setCurrentTier} />
      <VehiclesSelectType value={currentType} onChange={setCurrentType} />
      {listData && listData.length > 0 ? (
        <>
          <h2>Vehicles data:</h2>
          <p>
            <VehiclesSelectRanking value={currentRanking} onChange={setCurrentRanking} />
          </p>
        </>
      ) : (
        <></>
      )}
      {currentCompareSet.size == 2 ? (
        <p>
          <VehiclesCompareLink compareSet={currentCompareSet} listData={listData} />
        </p>
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
