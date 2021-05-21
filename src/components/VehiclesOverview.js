import { VehiclesSelectTier } from './VehiclesSelectTier';
import { VehiclesSelectType } from './VehiclesSelectType';
import { VehiclesTable } from './VehiclesTable';

export function VehiclesOverview(parameters) {
  let view =
    VehiclesSelectTier(parameters['tier']) +
    VehiclesSelectType(parameters['type']) +
    VehiclesTable(parameters);
  return view;
}
