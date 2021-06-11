import React from 'react';
import { useCompare } from '../customHooks';

export function VehiclesCompare({ queryCompare }) {
  const { error, isLoading, compareData } = useCompare(queryCompare);
  if (error != null) {
    return <p>{error}</p>;
  }
  if (isLoading) {
    return <p>Please wait. Loading data ...</p>;
  }
  if (!compareData || compareData.length != 2) {
    return <p>Unknown data processing error</p>;
  }
  return (
    <table>
      <thead>
        <tr>
          <th>Advantage</th>
          <th>Value</th>
          <th>Feature</th>
          <th>Value</th>
          <th>Advantage</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td></td>
          <td>
            <img src={compareData[0].images.preview} />
          </td>
          <td></td>
          <td>
            <img src={compareData[1].images.preview} />
          </td>
          <td></td>
        </tr>
        <CompareRow name={'Name'} left={compareData[0].name} right={compareData[1].name} />
        <CompareRow name={'Nation'} left={compareData[0].nation} right={compareData[1].nation} />
        <CompareRow name={'Tier'} left={compareData[0].tier} right={compareData[1].tier} />
        <CompareRow name={'Type'} left={compareData[0].type} right={compareData[1].type} />
        <CompareRowDiff
          name={'Hit points'}
          left={compareData[0].default_profile.hp}
          right={compareData[1].default_profile.hp}
        />
        <CompareRowDiff
          name={'Speed'}
          left={compareData[0].default_profile.speed_forward}
          right={compareData[1].default_profile.speed_forward}
        />
        <CompareRowDiff
          name={'Damage'}
          left={compareData[0].default_profile.shells[0].damage}
          right={compareData[1].default_profile.shells[0].damage}
        />
        <CompareRowDiffReverse
          name={'Dispersion'}
          left={compareData[0].default_profile.gun.dispersion}
          right={compareData[1].default_profile.gun.dispersion}
        />
      </tbody>
    </table>
  );
}

function CompareRow({ name, left, right }) {
  return (
    <tr>
      <td></td>
      <td>{left}</td>
      <td>{name}</td>
      <td>{right}</td>
      <td></td>
    </tr>
  );
}

function CompareRowDiff({ name, left, right }) {
  return (
    <tr>
      <td>
        {left > right
          ? `+${left - right} (${Math.round(((left - right) / right) * 1000) / 10}%)`
          : ''}
      </td>
      <td>{left}</td>
      <td>{name}</td>
      <td>{right}</td>
      <td>
        {right > left
          ? `+${right - left} (${Math.round(((right - left) / left) * 1000) / 10}%)`
          : ''}
      </td>
    </tr>
  );
}

function CompareRowDiffReverse({ name, left, right }) {
  return (
    <tr>
      <td>
        {right > left
          ? `-${Math.round((right - left) * 100) / 100} (${
              Math.round(((right - left) / left) * 1000) / 10
            }%)`
          : ''}
      </td>
      <td>{left}</td>
      <td>{name}</td>
      <td>{right}</td>
      <td>
        {left > right
          ? `-${Math.round((left - right) * 100) / 100} (${
              Math.round(((left - right) / right) * 1000) / 10
            }%)`
          : ''}
      </td>
    </tr>
  );
}
