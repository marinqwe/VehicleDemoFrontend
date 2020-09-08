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

function EditVehicleModel({
  match: {
    params: { id },
  },
}) {
  const { editVehicleModelViewStore } = useStores();

  useEffect(() => {
    editVehicleModelViewStore.getVehicleModel(id);
  }, [editVehicleModelViewStore, id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    await editVehicleModelViewStore.save(id);
  };

  return useObserver(() => (
    <div>
      <h2>Edit Vehicle Model</h2>
      <StyledForm onSubmit={handleSubmit}>
        <label>
          MakeId: <br />
          <VehicleInput
            type='text'
            name='makeId'
            value={editVehicleModelViewStore.vehicleModel.makeId}
            storeKey={editVehicleModelViewStore.vehicleModel}
            placeholder='Make Id'
          />
        </label>
        <label>
          Name: <br />
          <VehicleInput
            type='text'
            name='name'
            value={editVehicleModelViewStore.vehicleModel.name}
            storeKey={editVehicleModelViewStore.vehicleModel}
            placeholder='Name'
          />
        </label>
        <label>
          Abrv: <br />
          <VehicleInput
            type='text'
            name='abrv'
            value={editVehicleModelViewStore.vehicleModel.abrv}
            storeKey={editVehicleModelViewStore.vehicleModel}
            placeholder='Abrv'
          />
        </label>

        <ButtonGroup>
          <GreenButton disabled={editVehicleModelViewStore.loading}>
            Confirm
          </GreenButton>
          <CancelButton onClick={() => history.goBack()}>Cancel</CancelButton>
        </ButtonGroup>
      </StyledForm>
      {!editVehicleModelViewStore.error &&
        editVehicleModelViewStore.loading && (
          <p>Update submitted, please wait...</p>
        )}
      {editVehicleModelViewStore.error && (
        <StyledError>{editVehicleModelViewStore.error}</StyledError>
      )}
    </div>
  ));
}

export default EditVehicleModel;
