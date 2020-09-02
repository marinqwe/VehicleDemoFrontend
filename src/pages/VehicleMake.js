import React, { useEffect } from 'react';
import { useObserver } from 'mobx-react';
import { useStores } from '../common/stores/use-stores';
import {
  VehicleMakesList,
  VehicleMakeFilter,
  VehicleMakeSorting,
} from '../components';
import {
  Title,
  StyledVehiclePage,
  VehiclePageHeading,
  StyledLink,
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
      <VehicleMakesList vehicleMakes={vehicleMakeStore.vehicleMakes} />
    </StyledVehiclePage>
  ));
}

export default VehicleMake;
