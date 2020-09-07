import { observable, action } from 'mobx';

export function vehicleModelStore(vehicleModelApi) {
  return observable(
    {
      getErr: null,
      cudErr: null,
      cudLoading: false,
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
      vehicleModel: {
        name: '',
        abrv: '',
        makeId: null,
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
      async createVehicleModel(vehicleModel) {
        this.cudErr = null;
        if (!vehicleModel.name || !vehicleModel.abrv || !vehicleModel.makeId) {
          this.cudErr = 'Please fill out the form before submitting.';
        } else {
          this.cudLoading = true;
          try {
            await vehicleModelApi.createVehicleModel(vehicleModel);
            this.cudLoading = false;
          } catch (error) {
            this.cudErr = 'ERROR: Failed to create the model.';
            this.cudLoading = false;
          }
        }
      },
      async editVehicleModel(id, vehicleModel) {
        this.cudErr = null;
        if (!vehicleModel.name || !vehicleModel.abrv || !vehicleModel.makeId) {
          this.cudErr = 'Please fill out the form before submitting.';
        } else {
          this.cudLoading = true;
          try {
            await vehicleModelApi.editVehicleModel({ id, ...vehicleModel });
            this.cudLoading = false;
          } catch (error) {
            this.cudErr = 'ERROR: Failed to edit the model.';
            this.cudLoading = false;
          }
        }
      },
      async removeVehicleModel(id) {
        this.cudErr = null;
        this.cudLoading = true;
        try {
          await vehicleModelApi.deleteVehicleModel(id);
          this.cudLoading = false;
        } catch (error) {
          this.cudErr = 'ERROR: Failed to delete the model.';
          this.cudLoading = false;
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
      createVehicleModel: action,
      editVehicleModel: action,
      removeVehicleModel: action,
      setSortBy: action,
      setPageNumber: action,
    }
  );
}
