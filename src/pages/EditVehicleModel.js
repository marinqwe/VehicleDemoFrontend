import React, { useEffect } from 'react';
import { useStores } from '../common/stores/use-stores';
import { useObserver } from 'mobx-react';
import { VehicleInput } from '../components';
import { StyledForm, GreenButton, CancelButton, ButtonGroup } from '../layouts';

function EditVehicleModel({
  match: {
    params: { id },
  },
  history,
}) {
  const { vehicleModelStore } = useStores();

  useEffect(() => {
    vehicleModelStore.getVehicleModel(id);
  }, [vehicleModelStore, id]);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('EDIT SUBMITTED!');
  };

  return useObserver(() => (
    <div>
      <h2>Edit Vehicle Model</h2>
      <StyledForm onSubmit={handleSubmit}>
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

export default EditVehicleModel;
