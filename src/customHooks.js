import { useEffect, useState } from 'react';
import { updateLocationQuery } from './helpers/appLocation';
import { getVehiclesList, getVehiclesCompare } from './data/vehiclesData';

export function useList({ tier = '', type = '', ranking = '' }) {
  const [currentTier, setCurrentTier] = useState(tier);
  const [currentType, setCurrentType] = useState(type);
  const [currentRanking, setCurrentRanking] = useState(ranking);
  const [currentCompareSet, setCurrentCompareSet] = useState(new Set());
  const [error, setError] = useState(null);
  const [listData, setListData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const queryList = { view: 'list' };
    if (currentTier) {
      queryList['tier'] = currentTier;
    }
    if (currentType) {
      queryList['type'] = currentType;
    }
    if (currentRanking) {
      queryList['ranking'] = currentRanking;
    }
    updateLocationQuery(queryList);
    if (currentTier && currentType) {
      setIsLoading(true);
      getVehiclesList(currentTier, currentType, currentRanking)
        .then(data => {
          setError(null);
          setListData(data);
        })
        .catch(err => {
          setError(err.message);
        })
        .finally(() => {
          setIsLoading(false);
        });
    } else {
      setListData(null);
    }
  }, [currentTier, currentType, currentRanking]);

  useEffect(() => {
    setCurrentCompareSet(new Set());
  }, [currentTier, currentType]);

  return {
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
  };
}

export function useCompare({ tank_id = [] }) {
  const [currentId, setCurrentId] = useState(tank_id);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [compareData, setCompareData] = useState(null);

  useEffect(() => {
    setIsLoading(true);
    getVehiclesCompare(tank_id)
      .then(data => {
        setError(null);
        setCompareData(data);
      })
      .catch(err => {
        setError(err.message);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [currentId]);

  return { error, isLoading, compareData };
}
