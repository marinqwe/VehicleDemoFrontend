import React from 'react';
import { useStores } from '../common/stores/use-stores';
import { useObserver } from 'mobx-react';
import { VehicleInput } from '../components';
import { StyledForm, GreenButton, CancelButton, ButtonGroup } from '../styles';

function CreateVehicleModel({ history }) {
  const { vehicleModelStore } = useStores();

  const handleSubmit = (e) => {
    e.preventDefault();
    vehicleModelStore
      .createVehicleModel()
      .then(() => history.push('/vehicle-models'));
  };

  return useObserver(() => (
    <div>
      <h2>Create Vehicle Make</h2>
      <StyledForm onSubmit={handleSubmit}>
        <label>
          MakeId: <br />
          <VehicleInput
            type='number'
            value={vehicleModelStore.vehicleModel.makeId}
            name='makeId'
            storeKey={vehicleModelStore.vehicleModel}
            placeholder='Id of vehicle make'
          />
        </label>
        <label>
          Name: <br />
          <VehicleInput
            type='text'
            value={vehicleModelStore.vehicleModel.name}
            name='name'
            storeKey={vehicleModelStore.vehicleModel}
            placeholder='Name'
          />
        </label>
        <label>
          Abrv: <br />
          <VehicleInput
            type='text'
            value={vehicleModelStore.vehicleModel.abrv}
            name='abrv'
            storeKey={vehicleModelStore.vehicleModel}
            placeholder='Abrv'
          />
        </label>

        <ButtonGroup>
          <GreenButton>Confirm</GreenButton>
          <CancelButton onClick={() => history.goBack()}>Cancel</CancelButton>
        </ButtonGroup>
      </StyledForm>
    </div>
  ));
}

export default CreateVehicleModel;
