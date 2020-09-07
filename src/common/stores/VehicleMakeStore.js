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
      async getVehicleMakes() {
        this.getErr = null;
        this.loadingVehicles = true;

        const params = {
          sortBy: this.sortBy,
          searchString: this.searchString,
          page: this.pagingInfo.pageNumber,
        };
        try {
          const { data } = await vehicleMakeApi.getAll(params);
          this.vehicleMakes = data.vehicles;
          this.pagingInfo = {
            ...data.pagingInfo,
          };
          this.loadingVehicles = false;
        } catch (error) {
          this.getErr = 'ERROR: Unable to fetch vehicles.';
          this.loadingVehicles = false;
        }
      },
      async getVehicleMake(makeId) {
        this.getErr = null;
        this.loadingVehicle = true;
        try {
          const { data } = await vehicleMakeApi.getVehicleMake(makeId);
          this.vehicleMake = { ...data };
          this.loadingVehicle = false;
        } catch (error) {
          this.getErr = 'ERROR: Unable to fetch the vehicle.';
          this.loadingVehicle = false;
        }
      },
      async createVehicleMake(vehicleMake) {
        this.cudErr = null;
        if (!vehicleMake.name || !vehicleMake.abrv) {
          this.cudErr = 'Please fill out the form before submitting.';
        } else {
          this.cudLoading = true;
          try {
            await vehicleMakeApi.createVehicleMake(vehicleMake);
            this.cudLoading = false;
          } catch (error) {
            this.cudLoading = false;
            this.cudErr = 'ERROR: Failed to create the vehicle.';
          }
        }
      },
      async editVehicleMake(makeId, vehicleMake) {
        this.cudErr = null;
        if (!vehicleMake.name || !vehicleMake.abrv) {
          this.cudErr = 'Please fill out the form before submitting.';
        } else {
          this.cudLoading = true;
          try {
            await vehicleMakeApi.editVehicleMake({ makeId, ...vehicleMake });
            this.cudLoading = false;
          } catch (error) {
            this.cudLoading = false;
            this.cudErr = 'ERROR: Failed to update the vehicle';
          }
        }
      },
      async removeVehicleMake(makeId) {
        this.cudLoading = true;
        this.cudErr = null;
        try {
          await vehicleMakeApi.deleteVehicleMake(makeId);
          this.cudLoading = false;
        } catch (error) {
          this.cudLoading = false;
          this.cudErr = 'ERROR: Failed to delete the vehicle.';
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
