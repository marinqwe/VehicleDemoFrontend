import { observable, action } from 'mobx';

export function vehicleMakeStore(vehicleMakeApi) {
  return observable(
    {
      getErr: null,
      cudErr: null,
      cudLoading: false,
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
        this.getErr = null;
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
            this.getErr = 'ERROR: Unable to fetch vehicles.';
            this.loadingVehicles = false;
          });
      },
      getVehicleMake(makeId) {
        this.getErr = null;
        this.loadingVehicle = true;
        return vehicleMakeApi
          .getVehicleMake(makeId)
          .then(({ data }) => {
            this.vehicleMake = { ...data };
            this.loadingVehicle = false;
          })
          .catch((err) => {
            this.getErr = 'ERROR: Unable to fetch the vehicle.';
            this.loadingVehicle = false;
          });
      },
      createVehicleMake(vehicleMake) {
        this.cudErr = null;
        if (!vehicleMake.name || !vehicleMake.abrv) {
          this.cudErr = 'Please fill out the form before submitting.';
        } else {
          this.cudLoading = true;
          return vehicleMakeApi
            .createVehicleMake(vehicleMake)
            .then(() => {
              this.cudLoading = false;
            })
            .catch((err) => {
              this.cudLoading = false;
              this.cudErr = 'ERROR: Failed to create the vehicle.';
            });
        }
      },
      editVehicleMake(makeId, vehicleMake) {
        this.cudErr = null;
        if (!vehicleMake.name || !vehicleMake.abrv) {
          this.cudErr = 'Please fill out the form before submitting.';
        } else {
          this.cudLoading = true;
          return vehicleMakeApi
            .editVehicleMake({ makeId, ...vehicleMake })
            .then(() => {
              this.cudLoading = false;
            })
            .catch((err) => {
              this.cudLoading = false;
              this.cudErr = 'ERROR: Failed to update the vehicle';
            });
        }
      },
      removeVehicleMake(makeId) {
        this.cudLoading = true;
        this.cudErr = null;
        return vehicleMakeApi
          .deleteVehicleMake(makeId)
          .then(() => {
            this.cudLoading = false;
          })
          .catch((err) => {
            this.cudLoading = false;
            this.cudErr = 'ERROR: Failed to delete the vehicle.';
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
      getVehicleMakes: action,
      getVehicleMake: action,
      createVehicleMake: action,
      editVehicleMake: action,
      removeVehicleMake: action,
      setSortBy: action,
      setPageNumber: action,
    }
  );
}
