import { observable, action } from 'mobx';

const initialStoreData = {
  error: null,
  loading: false,
  vehicleMake: {
    name: '',
    abrv: '',
  },
};

export function createVehicleMakeViewStore(vehicleMakeApi) {
  return observable(
    {
      ...initialStoreData,
      async save(history) {
        if (!this.vehicleMake.name || !this.vehicleMake.abrv) {
          this.error = 'Please fill out the form before submitting.';
        } else {
          try {
            this.error = null;
            this.loading = true;
            await vehicleMakeApi.createVehicleMake(this.vehicleMake);
            this.loading = false;
            history.push('/vehicle-makes');
          } catch (error) {
            this.loading = false;
            this.error = 'ERROR: Failed to create the vehicle.';
          }
        }
      },
    },
    {
      save: action,
    }
  );
}
