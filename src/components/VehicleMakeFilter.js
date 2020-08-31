import React from 'react';
import { useStores } from '../common/stores/use-stores';
import { useObserver } from 'mobx-react';
import VehicleInput from './VehicleInput';
import { StyledSearch, GreenButton } from '../styles';

function VehicleMakeFilter() {
  const { vehicleMakeStore } = useStores();
  const handleSubmit = (e) => {
    e.preventDefault();
    vehicleMakeStore.getVehicleMakes();
  };
  return useObserver(() => (
    <StyledSearch onSubmit={(e) => handleSubmit(e)}>
      <label>
        <VehicleInput
          type='text'
          value={vehicleMakeStore.searchString}
          name='searchString'
          storeKey={vehicleMakeStore}
          placeholder='Search for vehicles...'
        />
      </label>
      <GreenButton type='submit'>Find</GreenButton>
    </StyledSearch>
  ));
}

export default VehicleMakeFilter;
