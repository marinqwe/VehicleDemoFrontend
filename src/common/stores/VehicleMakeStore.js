import { observable, action, computed, decorate } from 'mobx';

class VehicleMakeStore {
  vehicleMakeApi;
  constructor(vehicleMakeApi) {
    this.vehicleMakeApi = vehicleMakeApi;
  }

  getErr = null;
  deleteErr = null;
  isDeleting = false;
  loadingVehicles = false;
  loadingVehicle = false;
  vehicleMakes = [];
  sortBy = '';
  searchString = '';
  pagingInfo = {
    pageNumber: 1,
    totalCount: 0,
    resultsPerPage: 0,
  };

  async getVehicleMakes() {
    this.getErr = null;
    this.loadingVehicles = true;

    const params = {
      sortBy: this.sortBy,
      searchString: this.searchString,
      page: this.pagingInfo.pageNumber,
    };
    try {
      const { data } = await this.vehicleMakeApi.getAll(params);
      this.vehicleMakes = data.vehicles;
      this.pagingInfo = {
        ...data.pagingInfo,
      };
      this.loadingVehicles = false;
    } catch (error) {
      this.getErr = 'ERROR: Unable to fetch vehicles.';
      this.loadingVehicles = false;
    }
  }

  async getVehicleMake(makeId) {
    this.getErr = null;
    this.loadingVehicle = true;
    try {
      const { data } = await this.vehicleMakeApi.getVehicleMake(makeId);
      this.vehicleMake = { ...data };
      this.loadingVehicle = false;
    } catch (error) {
      this.getErr = 'ERROR: Unable to fetch the vehicle.';
      this.loadingVehicle = false;
    }
  }
  async removeVehicleMake(makeId) {
    this.isDeleting = true;
    this.deleteErr = null;
    try {
      await this.vehicleMakeApi.deleteVehicleMake(makeId);
      this.isDeleting = false;
    } catch (error) {
      this.isDeleting = false;
      this.deleteErr = 'ERROR: Failed to delete the vehicle.';
    }
  }
  setSortBy(sortBy) {
    this.sortBy = sortBy;
  }
  setPageNumber(pageNumber) {
    this.pagingInfo.pageNumber = pageNumber;
  }
  get pageCount() {
    return (
      Math.ceil(this.pagingInfo.totalCount / this.pagingInfo.resultsPerPage) ||
      1
    );
  }
}
decorate(VehicleMakeStore, {
  getErr: observable,
  deleteErr: observable,
  isDeleting: observable,
  loadingVehicles: observable,
  loadingVehicle: observable,
  vehicleMakes: observable,
  sortBy: observable,
  searchString: observable,
  pagingInfo: observable,
  getVehicleMake: action,
  getVehicleMakes: action,
  removeVehicleMake: action,
  setPageNumber: action,
  setSortBy: action,
  pageCount: computed,
});

export { VehicleMakeStore };
