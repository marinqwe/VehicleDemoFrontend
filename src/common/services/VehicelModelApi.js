import axios from 'axios';

export default class VehicleModelApi {
  static getAll = (urlParams) =>
    axios.get('/api/vehiclemodel', {
      params: {
        ...urlParams,
      },
    });

  static getVehicleModel = (id) => axios.get(`/api/vehiclemodel/${id}`);

  static createVehicleModel = (vehicleModel) =>
    axios.post('/api/vehiclemodel', { ...vehicleModel });

  static deleteVehicleModel = (id) => axios.delete(`/api/vehiclemodel/${id}`);

  static editVehicleModel = ({ id, name, abrv }) =>
    axios.put(`/api/vehiclemodel/${id}`, {
      id,
      name,
      abrv,
    });
}
