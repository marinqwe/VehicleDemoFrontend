import React from 'react';
import { useObserver } from 'mobx-react';
import { StyledLink, StyledTable, StyledTd } from '../styles';
import { useStores } from '../common/stores/use-stores';

export default function VehicleMakesList({ vehicleMakes }) {
  const { vehicleMakeStore } = useStores();

  const handleRemoveVehicleMake = (makeId) => {
    vehicleMakeStore
      .removeVehicleMake(makeId)
      .then(() => vehicleMakeStore.getVehicleMakes());
  };

  return useObserver(() => (
    <StyledTable>
      <thead>
        <tr>
          <th>Id</th>
          <th>Name</th>
          <th>Abrv</th>
          <th>{vehicleMakeStore.loadingVehicles && 'Loading vehicles...'}</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        {vehicleMakes.map(({ makeId, name, abrv }) => (
          <tr key={makeId}>
            <td>{makeId}</td>
            <td>{name}</td>
            <td>{abrv}</td>
            <td>
              <StyledLink to={`/vehiclemakes/edit/${makeId}`}>Edit</StyledLink>
            </td>
            <StyledTd onClick={() => handleRemoveVehicleMake(makeId)}>
              Remove
            </StyledTd>
          </tr>
        ))}
      </tbody>
    </StyledTable>
  ));
}
