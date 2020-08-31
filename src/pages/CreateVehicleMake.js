import React from 'react';
import { useStores } from '../common/stores/use-stores';
import { useObserver } from 'mobx-react';
import { VehicleInput } from '../components';
import {
  StyledForm,
  GreenButton,
  CancelButton,
  ButtonGroup,
  StyledError,
} from '../styles';

function CreateVehicleMake({ history }) {
  const { vehicleMakeStore } = useStores();

  const handleSubmit = (e) => {
    e.preventDefault();
    vehicleMakeStore.createVehicleMake().then(() => {
      if (!vehicleMakeStore.cudErr) {
        history.push('/vehicle-makes');
      }
    });
  };

  return useObserver(() => (
    <div>
      <h2>Create Vehicle Make</h2>
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
      {vehicleMakeStore.cudErr && (
        <StyledError>{vehicleMakeStore.cudErr}</StyledError>
      )}
    </div>
  ));
}

export default CreateVehicleMake;
