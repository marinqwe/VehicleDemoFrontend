import React from 'react';
import {
  VehicleModelsList,
  VehicleModelFilter,
  VehicleModelSorting,
  VehicleModelPaging,
} from '../components';
import {
  Title,
  StyledLink,
  StyledVehiclePage,
  VehiclePageHeading,
} from '../styles';

function VehicleMake() {
  return (
    <StyledVehiclePage>
      <VehiclePageHeading>
        <Title>Vehicle Models page</Title>
        <VehicleModelSorting />
      </VehiclePageHeading>
      <VehicleModelFilter />
      <div>
        <StyledLink
          style={{ position: 'absolute', right: '3%' }}
          to='/vehicle-models/create'
        >
          ➡ Add a new model
        </StyledLink>
      </div>
      <VehicleModelPaging />
      <VehicleModelsList />
      <VehicleModelPaging />
    </StyledVehiclePage>
  );
}

export default VehicleMake;
