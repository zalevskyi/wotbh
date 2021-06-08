import { useEffect, useState } from './framework';
import { updateLocationQuery } from './helpers/appLocation';
import { getVehiclesList } from './data/vehiclesData';

export function useList({ tier = '', type = '' }) {
  const [currentTier, setCurrentTier] = useState(tier);
  const [currentType, setCurrentType] = useState(type);
  const [error, setError] = useState(null);
  const [listData, setListData] = useState([]);
  // isLoading is variable, not constant intentially
  // as it is the only way to set loading status in useEffect
  let [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const queryList = { view: 'list' };
    if (currentTier) {
      queryList['tier'] = currentTier;
    }
    if (currentType) {
      queryList['type'] = currentType;
    }
    updateLocationQuery(queryList);
    if (currentTier && currentType) {
      // setIsLoading - breaks rendering
      isLoading = true;
      getVehiclesList(currentTier, currentType)
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
      setListData([]);
    }
  }, [currentTier, currentType]);

  return {
    currentTier,
    setCurrentTier,
    currentType,
    setCurrentType,
    error,
    isLoading,
    listData,
  };
}
