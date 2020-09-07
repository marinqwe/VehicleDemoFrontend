import { observable, action } from 'mobx';

const initialStoreData = {
  error: null,
  loading: false,
  vehicleModel: {
    name: '',
    abrv: '',
    makeId: null,
  },
};

export function createVehicleModelViewStore(vehicleModelApi) {
  return observable(
    {
      ...initialStoreData,
      async save(history) {
        if (!this.vehicleModel.name || !this.vehicleModel.abrv ||!this.vehicleModel.makeId) {
          this.error = 'Please fill out the form before submitting.';
        } else {
          try {
            this.error = null;
            this.loading = true;
            await vehicleModelApi.createVehicleModel(this.vehicleModel);
            this.loading = false;
            history.push('/vehicle-models');
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
