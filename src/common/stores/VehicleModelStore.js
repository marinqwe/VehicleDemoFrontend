import { observable, action, computed, decorate, runInAction } from 'mobx';

class VehicleModelStore {
  vehicleModelApi;
  constructor(vehicleModelApi) {
    this.vehicleModelApi = vehicleModelApi;
  }

  getErr = null;
  deleteErr = null;
  isDeleting = false;
  loadingModels = false;
  loadingModel = false;
  vehicleModels = [];
  sortBy = '';
  searchString = '';
  pagingInfo = {
    pageNumber: 1,
    totalCount: 0,
    resultsPerPage: 0,
  };

  async getVehicleModels() {
    this.getErr = null;
    this.loadingModels = true;
    const params = {
      sortBy: this.sortBy,
      searchString: this.searchString,
      page: this.pagingInfo.pageNumber,
    };
    try {
      const { data } = await this.vehicleModelApi.getAll(params);
      runInAction(() => {
        this.vehicleModels = [...data.models];
        this.pagingInfo = {
          ...data.pagingInfo,
        };
        this.loadingModels = false;
      });
    } catch (error) {
      runInAction(() => {
        this.getErr = 'ERROR: Unable to fetch models.';
        this.loadingModels = false;
      });
    }
  }
  async getVehicleModel(id) {
    this.getErr = null;
    this.loadingModel = true;
    try {
      const { data } = await this.vehicleModelApi.getVehicleModel(id);
      runInAction(() => {
        this.vehicleModel = { ...data };
        this.loadingModel = false;
      });
    } catch (error) {
      runInAction(() => {
        this.getErr = 'ERROR: Unable to fetch the model';
        this.loadingModel = false;
      });
    }
  }
  async removeVehicleModel(id) {
    this.deleteErr = null;
    this.isDeleting = true;
    try {
      await this.vehicleModelApi.deleteVehicleModel(id);
      runInAction(() => {
        this.isDeleting = false;
      });
    } catch (error) {
      runInAction(() => {
        this.deleteErr = 'ERROR: Failed to delete the model.';
        this.isDeleting = false;
      });
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
decorate(VehicleModelStore, {
  getErr: observable,
  deleteErr: observable,
  isDeleting: observable,
  loadingModels: observable,
  loadingModel: observable,
  vehicleModels: observable,
  sortBy: observable,
  searchString: observable,
  pagingInfo: observable,
  getVehicleModels: action,
  getVehicleModel: action,
  removeVehicleModel: action,
  setPageNumber: action,
  setSortBy: action,
  pageCount: computed,
});

export { VehicleModelStore };
