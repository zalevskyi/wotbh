let types = [
  { name: 'Light Tank', code: 'lightTank' },
  { name: 'Medium Tank', code: 'mediumTank' },
  { name: 'Heavy Tank', code: 'heavyTank' },
  { name: 'AT', code: 'AT-SPG' },
];

export function VehiclesSelectType(selected) {
  return (
    `<label for='select-type'>Type: </label>` +
    `<select id='select-type' onchange='` +
    `window.updateAppLocation({type:this.value}); window.renderApp();` +
    `'>` +
    `<option value=''>---</value>` +
    types
      .map(
        type =>
          `<option value=${type.code} ${selected == type.code ? 'selected' : ''}>${
            type.name
          }</option>`,
      )
      .join('') +
    `</select >`
  );
}
