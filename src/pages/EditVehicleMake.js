import React, { useEffect } from 'react';
import { useStores } from '../common/stores/use-stores';
import { useObserver } from 'mobx-react';
import { VehicleInput } from '../components';
import {
  StyledForm,
  GreenButton,
  CancelButton,
  ButtonGroup,
  Loader,
} from '../layouts';

function EditVehicleMake({
  match: {
    params: { id },
  },
  history,
}) {
  const { vehicleMakeStore } = useStores();

  useEffect(() => {
    vehicleMakeStore.getVehicleMake(id);
  }, [vehicleMakeStore, id]);

  const handleSubmit = (e) => {
    e.preventDefault();
    vehicleMakeStore
      .editVehicleMake(id)
      .then(() => history.push('/vehiclemakes'));
  };

  return useObserver(() => {
    if (vehicleMakeStore.loadingVehicle) {
      return <Loader>Loading vehicle...</Loader>;
    }

    return (
      <div>
        <h2>Edit Vehicle Make</h2>
        <StyledForm onSubmit={handleSubmit}>
          <label>
            Name: <br />
            <VehicleInput
              type='text'
              value={vehicleMakeStore.vehicleMake.name}
              name='name'
              storeKey={vehicleMakeStore.vehicleMake}
              placeholder='Name'
            />
          </label>
          <label>
            Abrv: <br />
            <VehicleInput
              type='text'
              value={vehicleMakeStore.vehicleMake.abrv}
              name='abrv'
              storeKey={vehicleMakeStore.vehicleMake}
              placeholder='Abrv'
            />
          </label>

          <ButtonGroup>
            <GreenButton>Confirm</GreenButton>
            <CancelButton onClick={() => history.goBack()}>Cancel</CancelButton>
          </ButtonGroup>
        </StyledForm>
      </div>
    );
  });
}

export default EditVehicleMake;
