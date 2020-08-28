import React from 'react';
import { useObserver } from 'mobx-react';
import { useStores } from '../common/stores/use-stores';
import { StyledPagination } from '../styles';

function VehicleMakePaging() {
  const { vehicleMakeStore } = useStores();

  const handleOnClick = (val) => {
    const pageNumber = vehicleMakeStore.pagingInfo.pageNumber + val;
    
    vehicleMakeStore.setPageNumber(pageNumber);
    vehicleMakeStore.getVehicleMakes();
  };

  return useObserver(() => (
    <StyledPagination>
      <button
        onClick={() => handleOnClick(-1)}
        disabled={vehicleMakeStore.pagingInfo.pageNumber === 1}
      >
        ⬅ Prev
      </button>
      <p>
        Page {vehicleMakeStore.pagingInfo.pageNumber} of{' '}
        {vehicleMakeStore.pageCount}
      </p>
      <button
        onClick={() => handleOnClick(1)}
        disabled={
          vehicleMakeStore.pagingInfo.pageNumber === vehicleMakeStore.pageCount
        }
      >
        Next ➡
      </button>
    </StyledPagination>
  ));
}

export default VehicleMakePaging;
