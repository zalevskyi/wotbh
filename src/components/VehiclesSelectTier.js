let tiers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

export function VehiclesSelectTier(selected) {
  return (
    `<label for='select-tier'>Tier: </label>` +
    `<select id='select-tier' onchange='` +
    `window.updateVehiclesList({tier:this.value})` +
    `'>` +
    `<option value=''>---</value>` +
    tiers.map(tier => `<option ${selected == tier ? 'selected' : ''}>${tier}</option>`).join('') +
    `</select >`
  );
}
