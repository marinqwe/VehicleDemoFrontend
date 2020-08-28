import React from 'react';
import {
  VehicleMakesList,
  VehicleMakeFilter,
  VehicleMakeSorting,
  VehicleMakePaging,
} from '../components';
import {
  Title,
  StyledVehiclePage,
  VehiclePageHeading,
  StyledLink,
} from '../styles';

function VehicleMake() {
  return (
    <StyledVehiclePage>
      <VehiclePageHeading>
        <Title>Vehicle makes page</Title>
        <VehicleMakeSorting />
      </VehiclePageHeading>
      <VehicleMakeFilter />
      <div>
        <StyledLink
          style={{ position: 'absolute', right: '3%' }}
          to='/vehicle-makes/create'
        >
          ➡ Create new vehicle
        </StyledLink>
      </div>
      <VehicleMakePaging />
      <VehicleMakesList />
      <VehicleMakePaging />
    </StyledVehiclePage>
  );
}

export default VehicleMake;
