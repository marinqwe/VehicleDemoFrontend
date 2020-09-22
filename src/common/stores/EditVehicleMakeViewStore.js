import { extendObservable, action, decorate } from 'mobx';

const initialStoreData = {
  error: null,
  loading: null,
  vehicleMake: {
    name: '',
    abrv: '',
  },
};

class EditVehicleMakeViewStore {
  vehicleMakeApi;
  constructor(vehicleMakeApi) {
    this.vehicleMakeApi = vehicleMakeApi;
    extendObservable(this, { ...initialStoreData });
  }

  async getVehicleMake(makeId) {
    this.error = null;
    this.loading = true;
    try {
      const { data } = await this.vehicleMakeApi.getVehicleMake(makeId);
      this.vehicleMake = { ...data };
      this.loading = false;
    } catch (error) {
      this.error = 'ERROR: Unable to fetch the vehicle.';
      this.loading = false;
    }
  }
  async save(makeId) {
    try {
      this.error = null;
      this.loading = true;

      await this.vehicleMakeApi.editVehicleMake({
        makeId,
        ...this.vehicleMake,
      });
      this.loading = false;
      this.resetState();
      this.history.push('/vehicle-makes');
    } catch (error) {
      this.error = 'Something went wrong. Edit failed.';
      this.loading = false;
    }
  }
  resetState() {
    this.vehicleMake = {
      name: '',
      abrv: '',
      makeId: null,
    };
  }
}
decorate(EditVehicleMakeViewStore, {
  getVehicleMake: action,
  save: action,
  resetState: action,
});
export { EditVehicleMakeViewStore };
