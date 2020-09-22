import { action, decorate, extendObservable } from 'mobx';

const initialStoreData = {
  error: null,
  loading: null,
  vehicleMake: {
    name: '',
    abrv: '',
  },
};

class CreateVehicleMakeViewStore {
  vehicleMakeApi;
  history;
  constructor(vehicleMakeApi, history) {
    this.vehicleMakeApi = vehicleMakeApi;
    this.history = history;
    extendObservable(this, { ...initialStoreData });
  }

  async save() {
    if (!this.vehicleMake.name || !this.vehicleMake.abrv) {
      this.error = 'Please fill out the form before submitting.';
    } else {
      try {
        this.error = null;
        this.loading = true;
        await this.vehicleMakeApi.createVehicleMake(this.vehicleMake);
        this.loading = false;
        this.resetState();
        this.history.push('/vehicle-makes');
      } catch (error) {
        this.loading = false;
        this.error = 'ERROR= Failed to create the vehicle.';
      }
    }
  }
  resetState() {
    Object.keys(initialStoreData).forEach(key => {
      this[key] = initialStoreData[key];
    })
  }
}
decorate(CreateVehicleMakeViewStore, {
  save: action,
  resetState: action,
});

export { CreateVehicleMakeViewStore };
