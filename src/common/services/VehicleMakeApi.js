import axios from 'axios';

class VehicleMakeApi {
  url;
  constructor(url) {
    this.url = url;
  }

  getAll(urlParams) {
    return axios.get(this.url, {
      params: {
        ...urlParams,
      },
    });
  }

  getVehicleMake(makeId) {
    return axios.get(`${this.url}/${makeId}`);
  }

  createVehicleMake(vehicle) {
    return axios.post(this.url, {
      ...vehicle,
    });
  }

  deleteVehicleMake(id) {
    return axios.delete(`${this.url}/${id}`);
  }

  editVehicleMake({ makeId, name, abrv }) {
    return axios.put(`${this.url}/${makeId}`, {
      makeId,
      name,
      abrv,
    });
  }
}
export { VehicleMakeApi };
