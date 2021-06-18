import React from 'react';
import { useList } from '../customHooks';
import { VehiclesSelect } from './VehiclesSelect';
import { VehiclesTable } from './VehiclesTable';
import { VehiclesCompareLink } from './VehiclesCompareLink';
import { tiers, types, rankings, vehiclesToCompare } from '../data/vehiclesData';

export function VehiclesOverview({ query }) {
  const {
    currentTier,
    setCurrentTier,
    currentType,
    setCurrentType,
    currentRanking,
    setCurrentRanking,
    currentCompareSet,
    toggleCompare,
    error,
    isLoading,
    listData,
  } = useList(query);
  return (
    <>
      <h1>WoT Blitz Vehicles</h1>
      <h2>Category selection</h2>
      <VehiclesSelect name="Tier" options={tiers} value={currentTier} onChange={setCurrentTier} />
      <VehiclesSelect
        name="Type"
        optionsWithCode={types}
        value={currentType}
        onChange={setCurrentType}
      />
      {listData && listData.length > 0 && (
        <>
          <h2>Vehicles data:</h2>
          <p>
            <VehiclesSelect
              name="Ranking"
              optionsWithCode={rankings}
              value={currentRanking}
              onChange={setCurrentRanking}
            />
          </p>
        </>
      )}
      {currentCompareSet.size === vehiclesToCompare && (
        <p>
          <VehiclesCompareLink compareSet={currentCompareSet} listData={listData} />
        </p>
      )}
      <VehiclesTable
        listData={listData}
        compareSet={currentCompareSet}
        toggleCompare={toggleCompare}
        error={error}
        isLoading={isLoading}
      />
    </>
  );
}
