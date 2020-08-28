import { observable } from 'mobx';

export function vehicleModelStore(vehicleModelApi) {
  return observable({
    loadingModels: true,
    loadingModel: true,
    vehicleModels: [],
    sortBy: '',
    searchString: '',
    pagingInfo: {
      pageNumber: 1,
      totalCount: 0,
      resultsPerPage: 0,
    },
    vehicleModel: {
      name: '',
      abrv: '',
      makeId: 0,
    },
    getVehicleModels() {
      this.loadingModels = true;
      const params = {
        sortBy: this.sortBy,
        searchString: this.searchString,
        page: this.pagingInfo.pageNumber,
      };
      vehicleModelApi
        .getAll(params)
        .then(({ data }) => {
          this.vehicleModels = [...data.models];
          this.pagingInfo = {
            ...data.pagingInfo,
          };
          this.loadingModels = false;
        })
        .catch((err) => {
          this.loadingModels = false;
          throw new Error('Unable to fetch vehicles.', err);
        });
    },
    getVehicleModel(id) {
      return vehicleModelApi
        .getVehicleModel(id)
        .then(({ data }) => {
          this.loadingModel = false;
          this.vehicleModel = { ...data };
        })
        .catch((err) => {
          this.loadingModel = false;
          throw new Error('Unable to fetch vehicle.', err);
        });
    },
    createVehicleModel() {
      return vehicleModelApi
        .createVehicleModel(this.vehicleModel)
        .catch((err) => {
          throw new Error('Error while creating a vehicle', err);
        });
    },
    editVehicleModel(id) {
      return vehicleModelApi
        .editVehicleModel({ id, ...this.vehicleModel })
        .catch((err) => {
          throw new Error('Error while editing vehicle.', err);
        });
    },
    removeVehicleModel(id) {
      return vehicleModelApi
        .deleteVehicleModel(id)
        .catch((err) => {
          throw new Error('Error while deleting vehicle model.', err);
        });
    },
    setSortBy(sortBy) {
      this.sortBy = sortBy;
    },
    setPageNumber(pageNumber) {
      this.pagingInfo.pageNumber = pageNumber;
    },
    get pageCount() {
      return (
        Math.ceil(
          this.pagingInfo.totalCount / this.pagingInfo.resultsPerPage
        ) || 1
      );
    },
  });
}
