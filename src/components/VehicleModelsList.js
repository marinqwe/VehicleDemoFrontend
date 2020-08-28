import React, { useEffect } from 'react';
import { useObserver } from 'mobx-react';
import { StyledLink, StyledTable, StyledTd } from '../styles';
import { useStores } from '../common/stores/use-stores';

export default function VehicleModelsList() {
  const { vehicleModelStore } = useStores();

  useEffect(() => {
    vehicleModelStore.getVehicleModels();
  }, [vehicleModelStore]);

  const handleRemoveVehicleModel = (id) => {
    vehicleModelStore
      .removeVehicleModel(id)
      .then(() => vehicleModelStore.getVehicleModels())
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
          <th>Make Id</th>
          <th>Name</th>
          <th>Abrv</th>
          <th>{vehicleModelStore.loadingModels && 'Loading models...'}</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
          {vehicleModelStore.vehicleModels.map(({ id, makeId, name, abrv }) => (
            <tr key={id}>
              <td>{id}</td>
              <td>{makeId}</td>
              <td>{name}</td>
              <td>{abrv}</td>
              <td>
                <StyledLink to={`vehiclemodels/edit/${id}`}>Edit</StyledLink>
              </td>
              <StyledTd onClick={() => handleRemoveVehicleModel(id)}>
                Remove
              </StyledTd>
            </tr>
          ))}
      </tbody>
    </StyledTable>
  ));
}
