import React, { useEffect } from 'react';
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

function EditVehicleMake({
  match: {
    params: { id },
  },
}) {
  const { editVehicleMakeViewStore } = useStores();

  useEffect(() => {
    editVehicleMakeViewStore.getVehicleMake(id);
  }, [editVehicleMakeViewStore, id]);

  const handleSubmit = (e) => {
    e.preventDefault();
    editVehicleMakeViewStore.save(id);
  };

  return useObserver(() => (
    <div>
      <h2>Edit Vehicle Make</h2>
      <StyledForm onSubmit={handleSubmit}>
        <label>
          Name: <br />
          <VehicleInput
            type='text'
            value={editVehicleMakeViewStore.vehicleMake.name}
            name='name'
            storeKey={editVehicleMakeViewStore.vehicleMake}
            placeholder='Name'
          />
        </label>
        <label>
          Abrv: <br />
          <VehicleInput
            type='text'
            value={editVehicleMakeViewStore.vehicleMake.abrv}
            name='abrv'
            storeKey={editVehicleMakeViewStore.vehicleMake}
            placeholder='Abrv'
          />
        </label>

        <ButtonGroup>
          <GreenButton disabled={editVehicleMakeViewStore.loading}>
            Confirm
          </GreenButton>
          <CancelButton onClick={() => history.goBack()}>Cancel</CancelButton>
        </ButtonGroup>
      </StyledForm>
      {!editVehicleMakeViewStore.error && editVehicleMakeViewStore.loading && (
        <p>Update submitted, please wait...</p>
      )}
      {editVehicleMakeViewStore.error && (
        <StyledError>{editVehicleMakeViewStore.cudErr}</StyledError>
      )}
    </div>
  ));
}

export default EditVehicleMake;
