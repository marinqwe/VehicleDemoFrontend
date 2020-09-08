import React from 'react';
import { useObserver } from 'mobx-react';
import { StyledLink, StyledTable, StyledTd, StyledError } from '../styles';
import { useStores } from '../common/stores/use-stores';
import VehicleMakePaging from './VehicleMakePaging';

export default function VehicleMakesList({ vehicleMakes }) {
  const { vehicleMakeStore } = useStores();

  const handleRemoveVehicleMake = (makeId) => {
    vehicleMakeStore
      .removeVehicleMake(makeId)
      .then(() => vehicleMakeStore.getVehicleMakes());
  };

  return useObserver(() => {
    if (vehicleMakeStore.getErr) {
      return <StyledError>{vehicleMakeStore.getErr}</StyledError>;
    }
    if (vehicleMakeStore.loadingVehicles) {
      return <p>Loading vehicles...</p>;
    }

    if (vehicleMakeStore.isDeleting) {
      return <p>Removing vehicle...</p>;
    }

    return (
      <>
        <VehicleMakePaging />
        <StyledTable>
          <thead>
            <tr>
              <th>Id</th>
              <th>Name</th>
              <th>Abrv</th>
              <th></th>
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
                  <StyledLink to={`/vehicle-makes/edit/${makeId}`}>
                    Edit
                  </StyledLink>
                </td>
                <StyledTd onClick={() => handleRemoveVehicleMake(makeId)}>
                  Remove
                </StyledTd>
              </tr>
            ))}
          </tbody>
        </StyledTable>
        <VehicleMakePaging />
      </>
    );
  });
}
