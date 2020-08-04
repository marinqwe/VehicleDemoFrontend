import axios from 'axios';

export default class VehicleMakeApi {
  static getAll = (urlParams) =>
    axios.get('/api/vehiclemake', {
      params: {
        ...urlParams,
      },
    });

  static getVehicleMake = (makeId) => axios.get(`/api/vehiclemake/${makeId}`);

  static createVehicleMake = (vehicle) =>
    axios.post('/api/vehiclemake', {
      ...vehicle,
    });

  static deleteVehicleMake = (id) => axios.delete(`/api/vehiclemake/${id}`);

  static editVehicleMake = ({ makeId, name, abrv }) =>
    axios.put(`/api/vehiclemake/${makeId}`, {
      makeId,
      name,
      abrv,
    });

}
