import React from 'react';
import { Select } from '../layouts';
import { useStores } from '../common/stores/use-stores';

function VehicleMakeSorting() {
  const { vehicleMakeStore } = useStores();

  const handleOnChange = (e) => {
    vehicleMakeStore.setSortBy(e.target.value);
    vehicleMakeStore.getVehicleMakes();
  };

  return (
    <Select onChange={handleOnChange}>
      <option value='' hidden>
        Sorting options{' '}
      </option>
      <option value='name'>Sort by name (enabled by default)</option>
      <option value='name_desc'>Sort by name descending</option>
      <option value='abrv'>Sort by abrv</option>
      <option value='abrv_desc'>Sort by abrv descending</option>
    </Select>
  );
}

export default VehicleMakeSorting;
