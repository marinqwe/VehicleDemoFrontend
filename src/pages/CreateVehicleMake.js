import React from 'react';
import { useStores } from '../common/stores/use-stores';
import { useObserver } from 'mobx-react';
import {
  StyledForm,
  GreenButton,
  CancelButton,
  ButtonGroup,
  StyledError,
} from '../styles';
import VehicleInput from '../components/VehicleInput';
import history from '../common/services/history';

function CreateVehicleMake() {
  const { createVehicleMakeViewStore } = useStores();

  const handleSubmit = async (e) => {
    e.preventDefault();
    await createVehicleMakeViewStore.save();
  };
  return useObserver(() => (
    <div>
      <h2>Create Vehicle Make</h2>
      <StyledForm onSubmit={handleSubmit}>
        <label>
          Name: <br />
          <VehicleInput
            type='text'
            name='name'
            value={createVehicleMakeViewStore.vehicleMake.name}
            storeKey={createVehicleMakeViewStore.vehicleMake}
            placeholder='Name'
          />
        </label>
        <label>
          Abrv: <br />
          <VehicleInput
            type='text'
            name='abrv'
            value={createVehicleMakeViewStore.vehicleMake.abrv}
            storeKey={createVehicleMakeViewStore.vehicleMake}
            placeholder='Abrv'
          />
        </label>

        <ButtonGroup>
          <GreenButton disabled={createVehicleMakeViewStore.loading}>
            Confirm
          </GreenButton>
          <CancelButton onClick={() => history.goBack()}>Cancel</CancelButton>
        </ButtonGroup>
      </StyledForm>
      {!createVehicleMakeViewStore.error &&
        createVehicleMakeViewStore.loading && (
          <p>Creating vehicle, please wait...</p>
        )}
      {createVehicleMakeViewStore.error && (
        <StyledError>{createVehicleMakeViewStore.error}</StyledError>
      )}
    </div>
  ));
}

export default CreateVehicleMake;
