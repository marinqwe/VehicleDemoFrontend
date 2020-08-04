import React from 'react';
import { vehicleMakeStore } from '../VehicleMakeStore';
import { useLocalStore } from 'mobx-react';

const vehicleMakeStoreContext = React.createContext();

export const VehicleMakeStoreProvider = ({ children }) => {
  const store = useLocalStore(vehicleMakeStore);
  return (
    <vehicleMakeStoreContext.Provider value={store}>
      {children}
    </vehicleMakeStoreContext.Provider>
  );
};

export const useVehicleMakeStore = () => {
  const store = React.useContext(vehicleMakeStoreContext);
  if (!store) {
    throw new Error('useStore must be used within a StoreProvider.');
  }
  return store;
};

