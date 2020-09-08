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

export function createVehicleModelViewStore(vehicleModelApi, history) {
  return observable(
    {
      ...initialStoreData,
      async save() {
        if (
          !this.vehicleModel.name ||
          !this.vehicleModel.abrv ||
          !this.vehicleModel.makeId
        ) {
          this.error = 'Please fill out the form before submitting.';
        } else {
          try {
            this.error = null;
            this.loading = true;
            await vehicleModelApi.createVehicleModel(this.vehicleModel);
            this.loading = false;
            this.resetState();
            history.push('/vehicle-models');
          } catch (error) {
            this.loading = false;
            this.error = 'ERROR: Failed to create the vehicle.';
          }
        }
      },
      resetState() {
        Object.keys(initialStoreData).forEach(key => {
          this[key] = initialStoreData[key];
        })
      },
    },
    {
      save: action,
      resetState: action
    }
  );
}
