import { observable, action } from 'mobx';

const initialStoreData = {
  error: null,
  loading: false,
  vehicleMake: {
    name: '',
    abrv: '',
  },
};

export function createVehicleMakeViewStore(vehicleMakeApi, history) {
  return observable(
    {
      ...initialStoreData,
      async save() {
        if (!this.vehicleMake.name || !this.vehicleMake.abrv) {
          this.error = 'Please fill out the form before submitting.';
        } else {
          try {
            this.error = null;
            this.loading = true;
            await vehicleMakeApi.createVehicleMake(this.vehicleMake);
            this.loading = false;
            this.resetState();
            history.push('/vehicle-makes');
          } catch (error) {
            this.loading = false;
            this.error = 'ERROR: Failed to create the vehicle.';
          }
        }
      },
      resetState() {
        Object.keys(initialStoreData).forEach((key) => {
          this[key] = initialStoreData[key];
        });
      },
    },
    {
      save: action,
      resetState: action,
    }
  );
}
