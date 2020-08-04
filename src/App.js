import React from 'react';
import { Route } from 'react-router-dom';
import StyledApp from './layouts/StyledApp';
import {
  Home,
  VehicleMake,
  VehicleModel,
  CreateVehicleModel,
  CreateVehicleMake,
  EditVehicleModel,
  EditVehicleMake,
} from './pages/index';

function App() {
  return (
    <StyledApp>
      <Route exact component={Home} path='/' />
      <Route exact component={VehicleMake} path='/vehiclemakes' />
      <Route exact component={VehicleModel} path='/vehiclemodels' />
      <Route component={EditVehicleMake} path='/vehiclemakes/edit/:id' />
      <Route component={EditVehicleModel} path='/vehiclemodels/edit/:id' />
      <Route component={CreateVehicleMake} path='/vehiclemakes/create' />
      <Route component={CreateVehicleModel} path='/vehiclemodels/create' />
    </StyledApp>
  );
}

export default App;
