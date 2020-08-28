import React from 'react';
import { Select } from '../styles';
import { useStores } from '../common/stores/use-stores';

function VehicleModelSorting() {
  const { vehicleModelStore } = useStores();

  const handleOnChange = (e) => {
    vehicleModelStore.setSortBy(e.target.value);
    vehicleModelStore.getVehicleModels();
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
      <option value='makeId'>Sort by make ID</option>
      <option value='makeId_desc'>Sort by make ID descending</option>
    </Select>
  );
}

export default VehicleModelSorting;
