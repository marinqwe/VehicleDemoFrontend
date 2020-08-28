import axios from 'axios';

export default class VehicleModelApi {
  static getAll = (urlParams) =>
    axios({
      method: 'GET',
      url: '/api/vehiclemodel',
      params: {
        ...urlParams,
      },
    });

  static getVehicleModel = (id) =>
    axios({
      method: 'GET',
      url: `/api/vehiclemodel/${id}`,
    });

  static createVehicleModel = (vehicle) =>
    axios({
      method: 'POST',
      url: '/api/vehiclemodel',
      data: {
        ...vehicle,
      },
    });

  static deleteVehicleModel = (id) =>
    axios({
      method: 'DELETE',
      url: `/api/vehiclemodel/${id}`,
    });

  static updateVehicleModel = ({ id, name, abrv }) =>
    axios({
      method: 'PUT',
      url: `/api/vehiclemodel/${id}`,
      data: {
        vehicleModel: {
          id,
          name,
          abrv,
        },
      },
    });
}
