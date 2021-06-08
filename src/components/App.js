/** @jsx createElement */
/** @jsxFrag createFragment */
import { useList } from '../customHooks';
import { createElement } from '../framework';
import { VehiclesOverview } from '../components/VehiclesOverview';
import { getCurrentQuery } from '../helpers/appLocation';

export function App() {
  const query = getCurrentQuery();
  if (query.list) {
    const {
      currentTier,
      setCurrentTier,
      currentType,
      setCurrentType,
      error,
      isLoading,
      listData,
    } = useList(query.list);
    return (
      <VehiclesOverview
        currentTier={currentTier}
        setCurrentTier={setCurrentTier}
        currentType={currentType}
        setCurrentType={setCurrentType}
        error={error}
        isLoading={isLoading}
        listData={listData}
      />
    );
  }
}
