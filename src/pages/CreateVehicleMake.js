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

function CreateVehicleMake({ history }) {
  const { vehicleMakeStore } = useStores();
  const [name, setName] = useState('');
  const [abrv, setAbrv] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    await vehicleMakeStore.createVehicleMake({ name, abrv });

    if (!vehicleMakeStore.cudErr) {
      history.push('/vehicle-makes');
    }
  };
  return useObserver(() => (
    <div>
      <h2>Create Vehicle Make</h2>
      <StyledForm onSubmit={handleSubmit}>
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
          <GreenButton disabled={vehicleMakeStore.cudLoading}>
            Confirm
          </GreenButton>
          <CancelButton onClick={() => history.goBack()}>Cancel</CancelButton>
        </ButtonGroup>
      </StyledForm>
      {!vehicleMakeStore.cudErr && vehicleMakeStore.cudLoading && (
        <p>Creating vehicle, please wait...</p>
      )}
      {vehicleMakeStore.cudErr && (
        <StyledError>{vehicleMakeStore.cudErr}</StyledError>
      )}
    </div>
  ));
}

export default CreateVehicleMake;
