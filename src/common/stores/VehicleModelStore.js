import { observable, action } from 'mobx';

export function vehicleModelStore(vehicleModelApi) {
  return observable(
    {
      getErr: null,
      deleteErr: null,
      isDeleting: false,
      loadingModels: false,
      loadingModel: false,
      vehicleModels: [],
      sortBy: '',
      searchString: '',
      pagingInfo: {
        pageNumber: 1,
        totalCount: 0,
        resultsPerPage: 0,
      },
      async getVehicleModels() {
        this.getErr = null;
        this.loadingModels = true;
        const params = {
          sortBy: this.sortBy,
          searchString: this.searchString,
          page: this.pagingInfo.pageNumber,
        };
        try {
          const { data } = await vehicleModelApi.getAll(params);
          this.vehicleModels = [...data.models];
          this.pagingInfo = {
            ...data.pagingInfo,
          };
          this.loadingModels = false;
        } catch (error) {
          this.getErr = 'ERROR: Unable to fetch models.';
          this.loadingModels = false;
        }
      },
      async getVehicleModel(id) {
        this.getErr = null;
        this.loadingModel = true;
        try {
          const { data } = await vehicleModelApi.getVehicleModel(id);
          this.vehicleModel = { ...data };
          this.loadingModel = false;
        } catch (error) {
          this.getErr = 'ERROR: Unable to fetch the model';
          this.loadingModel = false;
        }
      },
      async removeVehicleModel(id) {
        this.deleteErr = null;
        this.isDeleting = true;
        try {
          await vehicleModelApi.deleteVehicleModel(id);
          this.isDeleting = false;
        } catch (error) {
          this.deleteErr = 'ERROR: Failed to delete the model.';
          this.isDeleting = false;
        }
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
    },
    {
      getVehicleModels: action,
      getVehicleModel: action,
      removeVehicleModel: action,
      setSortBy: action,
      setPageNumber: action,
    }
  );
}
