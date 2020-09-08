import React from 'react';
import { useObserver } from 'mobx-react';
import { StyledLink, StyledTable, StyledTd, StyledError } from '../styles';
import { useStores } from '../common/stores/use-stores';
import VehicleModelPaging from './VehicleModelPaging';

export default function VehicleModelsList({ vehicleModels }) {
  const { vehicleModelStore } = useStores();

  const handleRemoveVehicleModel = (id) => {
    vehicleModelStore
      .removeVehicleModel(id)
      .then(() => vehicleModelStore.getVehicleModels());
  };

  return useObserver(() => {
    if (vehicleModelStore.getErr) {
      return <StyledError>{vehicleModelStore.getErr}</StyledError>;
    }
    if (vehicleModelStore.loadingModels) {
      return <p>Loading models...</p>;
    }
    if (vehicleModelStore.isDeleting) {
      return <p>Removing model...</p>;
    }

    return (
      <>
        <VehicleModelPaging />
        <StyledTable>
          <thead>
            <tr>
              <th>Id</th>
              <th>Make Id</th>
              <th>Name</th>
              <th>Abrv</th>
              <th>{vehicleModelStore.loadingModels && 'Loading models...'}</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {vehicleModels.map(({ id, makeId, name, abrv }) => (
              <tr key={id}>
                <td>{id}</td>
                <td>{makeId}</td>
                <td>{name}</td>
                <td>{abrv}</td>
                <td>
                  <StyledLink to={`vehicle-models/edit/${id}`}>Edit</StyledLink>
                </td>
                <StyledTd onClick={() => handleRemoveVehicleModel(id)}>
                  Remove
                </StyledTd>
              </tr>
            ))}
          </tbody>
        </StyledTable>
        <VehicleModelPaging />
      </>
    );
  });
}
