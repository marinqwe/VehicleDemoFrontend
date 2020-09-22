import React from 'react';
import {
  VehicleMakeStore,
  VehicleModelStore,
  EditVehicleMakeViewStore,
  EditVehicleModelViewStore,
  CreateVehicleMakeViewStore,
  CreateVehicleModelViewStore,
} from '../stores';
import { VehicleMakeApi } from '../services/VehicleMakeApi';
import { VehicleModelApi } from '../services/VehicelModelApi';
import history from '../services/history';

const vehicleMakeApiUrl = '/api/vehiclemake';
const vehicleModelApiUrl = '/api/vehiclemodel';

const makeApi = new VehicleMakeApi(vehicleMakeApiUrl);
const modelApi = new VehicleModelApi(vehicleModelApiUrl);

export const storesContext = React.createContext({
  vehicleMakeStore: new VehicleMakeStore(makeApi),
  vehicleModelStore: new VehicleModelStore(modelApi),
  editVehicleMakeViewStore: new EditVehicleMakeViewStore(makeApi, history),
  editVehicleModelViewStore: new EditVehicleModelViewStore(modelApi, history),
  createVehicleMakeViewStore: new CreateVehicleMakeViewStore(makeApi, history),
  createVehicleModelViewStore: new CreateVehicleModelViewStore(modelApi, history),
});
