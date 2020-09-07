import axios from 'axios';

class VehicleModelApi {
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

  getVehicleModel(id) {
    return axios.get(`${this.url}/${id}`);
  }

  createVehicleModel(vehicleModel) {
    return axios.post(this.url, { ...vehicleModel });
  }

  deleteVehicleModel(id) {
    return axios.delete(`${this.url}/${id}`);
  }

  editVehicleModel({ id, name, abrv, makeId }) {
    return axios.put(`${this.url}/${id}`, {
      id,
      name,
      abrv,
      makeId
    });
  }
}

export { VehicleModelApi };
