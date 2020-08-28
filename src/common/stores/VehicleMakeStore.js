import { observable } from 'mobx';

export function vehicleMakeStore(vehicleMakeApi) {
  return observable({
    loadingVehicles: false,
    loadingVehicle: false,
    vehicleMakes: [],
    sortBy: '',
    searchString: '',
    pagingInfo: {
      pageNumber: 1,
      totalCount: 0,
      resultsPerPage: 0,
    },
    vehicleMake: {
      name: '',
      abrv: '',
    },
    getVehicleMakes() {
      this.loadingVehicles = true;
      const params = {
        sortBy: this.sortBy,
        searchString: this.searchString,
        page: this.pagingInfo.pageNumber,
      };
      vehicleMakeApi
        .getAll(params)
        .then(({ data }) => {
          this.vehicleMakes = [...data.vehicles];
          this.pagingInfo = {
            ...data.pagingInfo,
          };
          this.loadingVehicles = false;
        })
        .catch((err) => {
          this.loadingVehicles = false;
          throw new Error('Unable to fetch vehicles.', err);
        });
    },
    getVehicleMake(makeId) {
      this.loadingVehicle = true;
      return vehicleMakeApi
        .getVehicleMake(makeId)
        .then(({ data }) => {
          this.loadingVehicle = false;
          this.vehicleMake = { ...data };
        })
        .catch((err) => {
          this.loadingVehicle = false;
          throw new Error('Unable to fetch vehicle.', err);
        });
    },
    createVehicleMake() {
      return vehicleMakeApi.createVehicleMake(this.vehicleMake).catch((err) => {
        throw new Error('Error while creating a vehicle', err);
      });
    },
    editVehicleMake(makeId) {
      return vehicleMakeApi
        .editVehicleMake({ makeId, ...this.vehicleMake })
        .catch((err) => {
          throw new Error('Error while editing vehicle.', err);
        });
    },
    removeVehicleMake(makeId) {
      return vehicleMakeApi.deleteVehicleMake(makeId).catch((err) => {
        throw new Error('Error while deleting vehicle.', err);
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
