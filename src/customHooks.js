import { useEffect, useState } from 'react';
import { updateLocationQuery } from './helpers/appLocation';
import { getVehiclesList } from './data/vehiclesData';

export function useList({ tier = '', type = '', ranking = '' }) {
  const [currentTier, setCurrentTier] = useState(tier);
  const [currentType, setCurrentType] = useState(type);
  const [currentRanking, setCurrentRanking] = useState(ranking);
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

  return {
    currentTier,
    setCurrentTier,
    currentType,
    setCurrentType,
    currentRanking,
    setCurrentRanking,
    error,
    isLoading,
    listData,
  };
}
