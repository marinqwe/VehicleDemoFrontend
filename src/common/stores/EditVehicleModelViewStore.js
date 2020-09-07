import { observable, action } from 'mobx';

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

export function editVehicleModelViewStore(vehicleModelApi) {
  return observable(
    {
      ...initialStoreData,
      async getVehicleModel(id) {
        this.error = null;
        this.loading = true;
        try {
          const { data } = await vehicleModelApi.getVehicleModel(id);
          console.log(data)
          this.vehicleModel = { ...data };
          this.loading = false;
        } catch (error) {
          this.error = 'ERROR: Unable to fetch the vehicle.';
          this.loading = false;
        }
      },
      async save(id, history) {
        try {
          this.error = null;
          this.loading = true;

          await vehicleModelApi.editVehicleModel({
            id,
            ...this.vehicleModel,
          });
          this.loading = false;
          history.push('/vehicle-models');
        } catch (error) {
          this.error = 'Something went wrong. Edit failed.';
          this.loading = false;
        }
      },
    },
    {
      getVehicleModel: action,
      save: action,
    }
  );
}
