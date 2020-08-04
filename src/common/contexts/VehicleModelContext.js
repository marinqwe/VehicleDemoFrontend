import React from 'react';
import { vehicleModelStore } from './VehicleModelStore';
import { useLocalStore } from 'mobx-react';

const vehicleModelStoreContext = React.createContext();

export const VehicleModelStoreProvider = ({ children }) => {
  const store = useLocalStore(vehicleModelStore);
  return (
    <vehicleModelStoreContext.Provider value={store}>
      {children}
    </vehicleModelStoreContext.Provider>
  );
};

export const useVehicleModelStore = () => {
  const store = React.useContext(vehicleModelStoreContext);
  if (!store) {
    throw new Error('useStore must be used within a StoreProvider.');
  }
  return store;
};

