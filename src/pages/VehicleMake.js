import React, { useEffect } from 'react';
import { useObserver } from 'mobx-react';
import { useStores } from '../common/stores/use-stores';
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
  StyledError,
} from '../styles';

function VehicleMake() {
  const { vehicleMakeStore } = useStores();

  useEffect(() => {
    //fetch & pass vehicleMakes as props for easier error handling
    vehicleMakeStore.getVehicleMakes();
  }, [vehicleMakeStore]);

  return useObserver(() => (
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
      {vehicleMakeStore.getErr ? (
        <StyledError>{vehicleMakeStore.getErr}</StyledError>
      ) : (
        <>
          <VehicleMakePaging />
          <VehicleMakesList vehicleMakes={vehicleMakeStore.vehicleMakes} />
          <VehicleMakePaging />
        </>
      )}
    </StyledVehiclePage>
  ));
}

export default VehicleMake;
