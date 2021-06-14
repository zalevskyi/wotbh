import React from 'react';

export function VehiclesTable({ listData, compareSet, setCompareSet, error, isLoading }) {
  if (error != null) {
    return <p>{error}</p>;
  }
  if (isLoading) {
    return <p>Please wait. Loading data ...</p>;
  }
  if (!listData) {
    return <p>Please select Tier and Type</p>;
  }
  if (listData.length === 0) {
    return <p>There are no vehicles for selected tier and type. Try another one</p>;
  }

  return (
    <table>
      <thead>
        <tr>
          <th>Name</th>
          <th>Nation</th>
          <th>Hit points</th>
          <th>Speed</th>
          <th>Damage</th>
          <th>Dispersion</th>
          <th>Compare</th>
        </tr>
      </thead>
      <tbody>
        {listData.map(vehicle => (
          <tr key={vehicle.tank_id}>
            <td>{vehicle.name}</td>
            <td>{vehicle.nation}</td>
            <td>{vehicle.default_profile.hp}</td>
            <td>{vehicle.default_profile.speed_forward}</td>
            <td>{vehicle.default_profile.shells.damage}</td>
            <td>{vehicle.default_profile.gun.dispersion}</td>
            <td>


              // move onChange to handler

              <input
                type="checkbox"
                value={vehicle.tank_id}
                disabled={compareSet.size == 2 && !compareSet.has(vehicle.tank_id)}
                checked={compareSet.has(vehicle.tank_id)}
                onChange={({ target }) => {
                  const newCompareSet = new Set(compareSet);
                  if (target.checked) {
                    newCompareSet.add(Number(target.value));
                  } else {
                    newCompareSet.delete(Number(target.value));
                  }
                  setCompareSet(newCompareSet);
                }}
              ></input>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
