import { observable, action } from 'mobx';

const initialStoreData = {
  error: null,
  loading: false,
  vehicleMake: {
    name: '',
    abrv: '',
    makeId: null,
  },
};

export function editVehicleMakeViewStore(vehicleMakeApi) {
  return observable(
    {
      ...initialStoreData,
      async getVehicleMake(makeId) {
        this.error = null;
        this.loading = true;
        try {
          const { data } = await vehicleMakeApi.getVehicleMake(makeId);
          this.vehicleMake = { ...data };
          this.loading = false;
        } catch (error) {
          this.error = 'ERROR: Unable to fetch the vehicle.';
          this.loading = false;
        }
      },
      async save(makeId, history) {
        try {
          this.error = null;
          this.loading = true;

          await vehicleMakeApi.editVehicleMake({
            makeId,
            ...this.vehicleMake,
          });
          this.loading = false;
          history.push('/vehicle-makes');
        } catch (error) {
          this.error = 'Something went wrong. Edit failed.';
          this.loading = false;
        }
      },
    },
    {
      getVehicleMake: action,
      save: action,
    }
  );
}
