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
        makeId: 0,
      },
      getVehicleModels() {
        this.getErr = null;
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
            this.getErr = 'ERROR: Unable to fetch models.';
            this.loadingModels = false;
          });
      },
      getVehicleModel(id) {
        this.getErr = null;
        this.loadingModel = true;
        return vehicleModelApi
          .getVehicleModel(id)
          .then(({ data }) => {
            this.vehicleModel = { ...data };
            this.loadingModel = false;
          })
          .catch((err) => {
            this.getErr = 'ERROR: Unable to fetch the model';
            this.loadingModel = false;
          });
      },
      createVehicleModel(vehicleModel) {
        this.cudErr = null;
        if (!vehicleModel.name || !vehicleModel.abrv || !vehicleModel.makeId) {
          this.cudErr = 'Please fill out the form before submitting.';
        } else {
          this.cudLoading = true;
          return vehicleModelApi
            .createVehicleModel(vehicleModel)
            .then(() => {
              this.cudLoading = false;
            })
            .catch((err) => {
              this.cudErr = 'ERROR: Failed to create the model.';
              this.cudLoading = false;
            });
        }
      },
      editVehicleModel(id, vehicleModel) {
        this.cudErr = null;
        if (!vehicleModel.name || !vehicleModel.abrv || !vehicleModel.makeId) {
          this.cudErr = 'Please fill out the form before submitting.';
        } else {
          this.cudLoading = true;
          return vehicleModelApi
            .editVehicleModel({ id, ...vehicleModel })
            .then(() => {
              this.cudLoading = false;
            })
            .catch((err) => {
              this.cudErr = 'ERROR: Failed to edit the model.';
              this.cudLoading = false;
            });
        }
      },
      removeVehicleModel(id) {
        this.cudErr = null;
        this.cudLoading = true;
        return vehicleModelApi
          .deleteVehicleModel(id)
          .then(() => {
            this.cudLoading = false;
          })
          .catch((err) => {
            this.cudErr = 'ERROR: Failed to delete the model.';
            this.cudLoading = false;
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
