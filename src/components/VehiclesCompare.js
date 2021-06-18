import React from 'react';
import { useCompare } from '../customHooks';

export function VehiclesCompare({ query }) {
  const { error, isLoading, compareData } = useCompare(query);
  if (error != null) {
    return (
      <>
        <h1>Face-to-face compare:</h1>
        <p>{error}</p>
      </>
    );
  }
  if (isLoading) {
    return (
      <>
        <h1>Face-to-face compare:</h1>
        <p>Please wait. Loading data ...</p>
      </>
    );
  }
  const [first, second] = compareData || [];
  if (!first || !second) {
    return (
      <>
        <h1>Face-to-face compare:</h1>
        <p>Unknown data processing error</p>
      </>
    );
  }

  document.title = `WoT Blitz Helper: ${first.name} (${first.nation}) vs. ${second.name} (${second.nation})`;

  return (
    <>
      <h1>Face-to-face compare:</h1>
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
          <ImagesRow left={first} right={second} />
          <CompareRow name={'Name'} left={first.name} right={second.name} />
          <CompareRow name={'Nation'} left={first.nation} right={second.nation} />
          <CompareRow name={'Tier'} left={first.tier} right={second.tier} />
          <CompareRow name={'Type'} left={first.type} right={second.type} />
          <CompareRowDiff
            name={'Hit points'}
            left={first.defaultProfile.hp}
            right={second.defaultProfile.hp}
          />
          <CompareRowDiff
            name={'Speed'}
            left={first.defaultProfile.speedForward}
            right={second.defaultProfile.speedForward}
          />
          <CompareRowDiff
            name={'Damage'}
            left={first.defaultProfile.shells[0].damage}
            right={second.defaultProfile.shells[0].damage}
          />
          <CompareRowDiffReverse
            name={'Dispersion'}
            left={first.defaultProfile.gun.dispersion}
            right={second.defaultProfile.gun.dispersion}
          />
        </tbody>
      </table>
    </>
  );
}

function ImagesRow({ left, right }) {
  return (
    <tr>
      <td />
      <td>
        <img src={left.images.preview} />
      </td>
      <td />
      <td>
        <img src={right.images.preview} />
      </td>
      <td />
    </tr>
  );
}

function CompareRow({ name, left, right }) {
  return (
    <tr>
      <td />
      <td>{left}</td>
      <td>{name}</td>
      <td>{right}</td>
      <td />
    </tr>
  );
}

function CompareRowDiff({ name, left, right }) {
  return (
    <tr>
      <td>{left > right && diffPositiveFeature(left, right)}</td>
      <td>{left}</td>
      <td>{name}</td>
      <td>{right}</td>
      <td>{right > left && diffPositiveFeature(left, right)}</td>
    </tr>
  );
}

function CompareRowDiffReverse({ name, left, right }) {
  return (
    <tr>
      <td>{right > left && diffNegativeFeature(left, right)}</td>
      <td>{left}</td>
      <td>{name}</td>
      <td>{right}</td>
      <td>{left > right && diffNegativeFeature(left, right)}</td>
    </tr>
  );
}

function diffPositiveFeature(first, second) {
  const [large, small] = first > second ? [first, second] : [second, first];
  return `+${Math.round((large - small) * 100) / 100} (${diffPercent(large, small)}%)`;
}

function diffNegativeFeature(first, second) {
  const [large, small] = first > second ? [first, second] : [second, first];
  return `-${Math.round((large - small) * 100) / 100} (${diffPercent(small, large)}%)`;
}

function diffPercent(value, base) {
  return Math.round(((value - base) / base) * 1000) / 10;
}
