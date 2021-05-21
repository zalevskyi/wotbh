import { VehiclesSelectTier } from './VehiclesSelectTier';
import { VehiclesSelectType } from './VehiclesSelectType';
import { VehiclesTable } from './VehiclesTable';

export function VehiclesOverview(parameters) {
  let view = VehiclesSelectTier(parameters['tier']) + VehiclesSelectType(parameters['type']);
  if (parameters['tier'] && parameters['type']) {
    view += VehiclesTable(parameters);
  }
  return view;
}
