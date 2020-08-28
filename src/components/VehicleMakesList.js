import React, { useEffect } from 'react';
import { useObserver } from 'mobx-react';
import { StyledLink, StyledTable, StyledTd } from '../styles';
import { useStores } from '../common/stores/use-stores';

export default function VehicleMakesList() {
  const { vehicleMakeStore } = useStores();

  useEffect(() => {
    vehicleMakeStore.getVehicleMakes();
  }, [vehicleMakeStore]);

  const handleRemoveVehicleMake = (makeId) => {
    vehicleMakeStore
      .removeVehicleMake(makeId)
      .then(() => vehicleMakeStore.getVehicleMakes())
      .catch((err) => {
        throw new Error(
          'Something went wrong. Please refresh the page and try again.',
          err
        );
      });
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
        {vehicleMakeStore.vehicleMakes.map(({ makeId, name, abrv }) => (
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
