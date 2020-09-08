import React from 'react';
import {
  vehicleMakeStore,
  vehicleModelStore,
  editVehicleMakeViewStore,
  editVehicleModelViewStore,
  createVehicleMakeViewStore,
  createVehicleModelViewStore,
} from '../stores';
import { VehicleMakeApi } from '../services/VehicleMakeApi';
import { VehicleModelApi } from '../services/VehicelModelApi';
import history from '../services/history';

const vehicleMakeApiUrl = '/api/vehiclemake';
const vehicleModelApiUrl = '/api/vehiclemodel';

const makeApi = new VehicleMakeApi(vehicleMakeApiUrl);
const modelApi = new VehicleModelApi(vehicleModelApiUrl);

export const storesContext = React.createContext({
  vehicleMakeStore: vehicleMakeStore(makeApi),
  vehicleModelStore: vehicleModelStore(modelApi),
  editVehicleMakeViewStore: editVehicleMakeViewStore(makeApi, history),
  editVehicleModelViewStore: editVehicleModelViewStore(modelApi, history),
  createVehicleMakeViewStore: createVehicleMakeViewStore(makeApi, history),
  createVehicleModelViewStore: createVehicleModelViewStore(modelApi, history),
});
