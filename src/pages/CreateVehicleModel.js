import React, { useState } from 'react';
import { useStores } from '../common/stores/use-stores';
import { useObserver } from 'mobx-react';
import {
  StyledForm,
  GreenButton,
  CancelButton,
  ButtonGroup,
  StyledError,
  StyledInput,
} from '../styles';

function CreateVehicleModel({ history }) {
  const { vehicleModelStore } = useStores();
  const [name, setName] = useState('');
  const [abrv, setAbrv] = useState('');
  const [makeId, setMakeId] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    await vehicleModelStore.createVehicleModel({ name, abrv, makeId });
    if (!vehicleModelStore.cudErr) {
      history.push('/vehicle-models');
    }
  };

  return useObserver(() => (
    <div>
      <h2>Create Vehicle Model</h2>
      <StyledForm onSubmit={handleSubmit}>
        <label>
          MakeId: <br />
          <StyledInput
            type='text'
            value={makeId}
            onChange={(e) => setMakeId(e.target.value)}
            placeholder='Make Id'
          />
        </label>
        <label>
          Name: <br />
          <StyledInput
            type='text'
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder='Name'
          />
        </label>
        <label>
          Abrv: <br />
          <StyledInput
            type='text'
            value={abrv}
            onChange={(e) => setAbrv(e.target.value)}
            placeholder='Abrv'
          />
        </label>

        <ButtonGroup>
          <GreenButton disabled={vehicleModelStore.cudLoading}>
            Confirm
          </GreenButton>
          <CancelButton onClick={() => history.goBack()}>Cancel</CancelButton>
        </ButtonGroup>
      </StyledForm>
      {!vehicleModelStore.cudErr && vehicleModelStore.cudLoading && (
        <p>Creating vehicle, please wait...</p>
      )}
      {vehicleModelStore.cudErr && (
        <StyledError>{vehicleModelStore.cudErr}</StyledError>
      )}
    </div>
  ));
}

export default CreateVehicleModel;
