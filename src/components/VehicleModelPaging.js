import React from 'react';
import { useObserver } from 'mobx-react';
import { useStores } from '../common/stores/use-stores';
import { StyledPagination } from '../styles';

function VehicleModelPaging() {
  const { vehicleModelStore } = useStores();

  const handleOnClick = (val) => {
    const pageNumber = vehicleModelStore.pagingInfo.pageNumber + val;

    vehicleModelStore.setPageNumber(pageNumber);
    vehicleModelStore.getVehicleModels();
  };

  return useObserver(() => (
    <StyledPagination>
      <button
        onClick={() => handleOnClick(-1)}
        disabled={vehicleModelStore.pagingInfo.pageNumber === 1}
      >
        ⬅ Prev
      </button>
      <p>
        Page {vehicleModelStore.pagingInfo.pageNumber} of{' '}
        {vehicleModelStore.pageCount}
      </p>
      <button
        onClick={() => handleOnClick(1)}
        disabled={
          vehicleModelStore.pagingInfo.pageNumber ===
          vehicleModelStore.pageCount
        }
      >
        Next ➡
      </button>
    </StyledPagination>
  ));
}

export default VehicleModelPaging;
