import { extendObservable, action, decorate, runInAction } from 'mobx';

const initialStoreData = {
  error: null,
  loading: null,
  vehicleModel: {
    name: '',
    abrv: '',
    makeId: null,
  },
};

class CreateVehicleModelViewStore {
  vehicleModelApi;
  history;
  constructor(vehicleModelApi, history) {
    this.vehicleModelApi = vehicleModelApi;
    this.history = history;
    extendObservable(this, { ...initialStoreData });
  }

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
        await this.vehicleModelApi.createVehicleModel(this.vehicleModel);
        runInAction(() => {
          this.loading = false;
          this.resetState();
          this.history.push('/vehicle-models');
        });
      } catch (error) {
        runInAction(() => {
          this.loading = false;
          this.error = 'ERROR: Failed to create the vehicle.';
        });
      }
    }
  }
  resetState() {
    Object.keys(initialStoreData).forEach((key) => {
      this[key] = initialStoreData[key];
    });
  }
}
decorate(CreateVehicleModelViewStore, {
  save: action,
  resetState: action,
});

export { CreateVehicleModelViewStore };
