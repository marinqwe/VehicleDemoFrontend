import React from 'react';
import { useStores } from '../common/stores/use-stores';
import { useObserver } from 'mobx-react';
import VehicleInput from './VehicleInput';
import { GreenButton, StyledSearch } from '../styles';

function VehicleModelFilter() {
  const { vehicleModelStore } = useStores();
  const handleSubmit = (e) => {
    e.preventDefault();
    vehicleModelStore.getVehicleModels();
  };
  return useObserver(() => (
    <StyledSearch onSubmit={(e) => handleSubmit(e)}>
      <label>
        <VehicleInput
          type='text'
          value={vehicleModelStore.searchString}
          name='searchString'
          storeKey={vehicleModelStore}
          placeholder='Search for models...'
        />
      </label>
      <GreenButton type='submit'>Find</GreenButton>
    </StyledSearch>
  ));
}

export default VehicleModelFilter;
