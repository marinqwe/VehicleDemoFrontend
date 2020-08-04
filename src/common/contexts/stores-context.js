import React from 'react';
import { vehicleMakeStore } from '../stores/VehicleMakeStore';
import { vehicleModelStore } from '../stores/VehicleModelStore';
import VehicleMakeApi from '../services/VehicleMakeApi';
import VehicleModelApi from '../services/VehicelModelApi';

export const storesContext = React.createContext({
  vehicleMakeStore: vehicleMakeStore(VehicleMakeApi),
  vehicleModelStore: vehicleModelStore(VehicleModelApi),
});
