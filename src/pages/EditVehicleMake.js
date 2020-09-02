import React, { useEffect, useState } from 'react';
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

function EditVehicleMake({
  match: {
    params: { id },
  },
  history,
}) {
  const { vehicleMakeStore } = useStores();
  const [name, setName] = useState('');
  const [abrv, setAbrv] = useState('');

  useEffect(() => {
    async function fetchData() {
      await vehicleMakeStore.getVehicleMake(id);
      setName(vehicleMakeStore.vehicleMake.name);
      setAbrv(vehicleMakeStore.vehicleMake.abrv);
    }
    fetchData();
  }, [vehicleMakeStore, id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    await vehicleMakeStore.editVehicleMake(id, { name, abrv });

    if (!vehicleMakeStore.cudErr) {
      history.push('/vehicle-makes');
    }
  };

  return useObserver(() => (
    <div>
      <h2>Edit Vehicle Make</h2>
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
          <GreenButton>Confirm</GreenButton>
          <CancelButton onClick={() => history.goBack()}>Cancel</CancelButton>
        </ButtonGroup>
      </StyledForm>
      {!vehicleMakeStore.cudErr && vehicleMakeStore.cudLoading && (
        <p>Update submitted, please wait...</p>
      )}
      {vehicleMakeStore.cudErr && (
        <StyledError>{vehicleMakeStore.cudErr}</StyledError>
      )}
    </div>
  ));
}

export default EditVehicleMake;
