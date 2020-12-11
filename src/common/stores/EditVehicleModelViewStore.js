import { action, decorate, extendObservable, runInAction } from 'mobx';

const initialStoreData = {
  error: null,
  loading: false,
  vehicleModel: {
    id: null,
    name: '',
    abrv: '',
    makeId: null,
  },
};

class EditVehicleModelViewStore {
  vehicleModelApi;
  history;
  constructor(vehicleModelApi, history) {
    this.vehicleModelApi = vehicleModelApi;
    this.history = history;
    extendObservable(this, { ...initialStoreData });
  }

  async getVehicleModel(id) {
    this.error = null;
    this.loading = true;
    try {
      const { data } = await this.vehicleModelApi.getVehicleModel(id);

      runInAction(() => {
        this.vehicleModel = { ...data };
        this.loading = false;
      });
    } catch (error) {
      runInAction(() => {
        this.error = 'ERROR: Unable to fetch the vehicle.';
        this.loading = false;
      });
    }
  }
  async save(id) {
    try {
      this.error = null;
      this.loading = true;

      await this.vehicleModelApi.editVehicleModel({
        id,
        ...this.vehicleModel,
      });
      runInAction(() => {
        this.loading = false;
        this.resetState();
        this.history.push('/vehicle-models');
      });
    } catch (error) {
      runInAction(() => {
        this.error = 'Something went wrong. Edit failed.';
        this.loading = false;
      });
    }
  }
  resetState() {
    Object.keys(initialStoreData).forEach((key) => {
      this[key] = initialStoreData[key];
    });
  }
}

decorate(EditVehicleModelViewStore, {
  save: action,
  getVehicleModel: action,
  resetState: action,
});

export { EditVehicleModelViewStore };
