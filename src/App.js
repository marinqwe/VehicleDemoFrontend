import React from 'react';
import { Route } from 'react-router-dom';
import StyledApp from './styles/StyledApp';
import {
  Home,
  VehicleMake,
  VehicleModel,
  CreateVehicleModel,
  CreateVehicleMake,
  EditVehicleModel,
  EditVehicleMake,
} from './pages/index';
import ErrorBoundary from './ErrorBoundary';

function App() {
  return (
    <StyledApp>
      <ErrorBoundary>
        <Route exact component={Home} path='/' />
        <Route exact component={VehicleModel} path='/vehicle-models' />
        <Route exact component={VehicleMake} path='/vehicle-makes' />
        <Route component={EditVehicleMake} path='/vehicle-makes/edit/:id' />
        <Route component={EditVehicleModel} path='/vehicle-models/edit/:id' />
        <Route component={CreateVehicleMake} path='/vehicle-makes/create' />
        <Route component={CreateVehicleModel} path='/vehicle-models/create' />
      </ErrorBoundary>
    </StyledApp>
  );
}

export default App;
