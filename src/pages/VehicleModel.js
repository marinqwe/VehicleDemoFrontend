import React, { useEffect } from 'react';
import { useObserver } from 'mobx-react';
import { useStores } from '../common/stores/use-stores';
import {
  VehicleModelsList,
  VehicleModelFilter,
  VehicleModelSorting,
} from '../components';
import {
  Title,
  StyledLink,
  StyledVehiclePage,
  VehiclePageHeading,
} from '../styles';

function VehicleModel() {
  const { vehicleModelStore } = useStores();

  useEffect(() => {
    //fetch & pass vehicleModels as props for easier error handling
    vehicleModelStore.getVehicleModels();
  }, [vehicleModelStore]);

  return useObserver(() => (
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
      <VehicleModelsList vehicleModels={vehicleModelStore.vehicleModels} />
    </StyledVehiclePage>
  ));
}

export default VehicleModel;
