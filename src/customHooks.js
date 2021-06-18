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
    const queryList = { view: 'list' };
    queryList['tier'] = currentTier;
    queryList['type'] = currentType;
    queryList['ranking'] = currentRanking;
    updateLocationQuery(queryList);
  }, [currentTier, currentType, currentRanking]);

  useEffect(() => {
    setCurrentCompareSet(new Set());
  }, [currentTier, currentType]);

  const toggleCompare = ({ target }) => {
    const newCompareSet = new Set(currentCompareSet);
    if (target.checked) {
      newCompareSet.add(Number(target.value));
    } else {
      newCompareSet.delete(Number(target.value));
    }
    setCurrentCompareSet(newCompareSet);
  };

  return {
    currentTier,
    setCurrentTier,
    currentType,
    setCurrentType,
    currentRanking,
    setCurrentRanking,
    currentCompareSet,
    setCurrentCompareSet,
    toggleCompare,
    error,
    isLoading,
    listData,
  };
}

export function useCompare({ tank_id = [] }) {
  const [currentId] = useState(tank_id);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [compareData, setCompareData] = useState([]);

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
