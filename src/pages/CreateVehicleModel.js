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

function CreateVehicleModel({ history }) {
  const { createVehicleModelViewStore } = useStores();

  const handleSubmit = async (e) => {
    e.preventDefault();
    await createVehicleModelViewStore.save(history);
  };

  return useObserver(() => (
    <div>
      <h2>Create Vehicle Model</h2>
      <StyledForm onSubmit={handleSubmit}>
        <label>
          MakeId: <br />
          <VehicleInput
            type='text'
            name='makeId'
            value={createVehicleModelViewStore.vehicleModel.makeId}
            storeKey={createVehicleModelViewStore.vehicleModel}
            placeholder='Make Id'
          />
        </label>
        <label>
          Name: <br />
          <VehicleInput
            type='text'
            name='name'
            value={createVehicleModelViewStore.vehicleModel.name}
            storeKey={createVehicleModelViewStore.vehicleModel}
            placeholder='Name'
          />
        </label>
        <label>
          Abrv: <br />
          <VehicleInput
            type='text'
            name='abrv'
            value={createVehicleModelViewStore.vehicleModel.abrv}
            storeKey={createVehicleModelViewStore.vehicleModel}
            placeholder='Abrv'
          />
        </label>

        <ButtonGroup>
          <GreenButton disabled={createVehicleModelViewStore.loading}>
            Confirm
          </GreenButton>
          <CancelButton onClick={() => history.goBack()}>Cancel</CancelButton>
        </ButtonGroup>
      </StyledForm>
      {!createVehicleModelViewStore.error &&
        createVehicleModelViewStore.loading && (
          <p>Creating vehicle, please wait...</p>
        )}
      {createVehicleModelViewStore.error && (
        <StyledError>{createVehicleModelViewStore.error}</StyledError>
      )}
    </div>
  ));
}

export default CreateVehicleModel;
