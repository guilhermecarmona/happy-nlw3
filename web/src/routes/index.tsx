import React from 'react';
import { BrowserRouter, Switch } from 'react-router-dom';
import Landing from '../pages/Landing';
import OrphanagesMap from '../pages/OrphanagesMap';
import CreateOrphanage from '../pages/CreateOrphanage';
import Orphanage from '../pages/Orphanage';
import Login from '../pages/Login';
import ForgotPassword from '../pages/ForgotPassword';
import Route from './Route';
import Dashboard from '../pages/Dashboard';
import PasswordReset from '../pages/PasswordReset';
import Pending from '../pages/Pending';
import SuccessfulCreation from '../pages/SuccessfulCreation';

const Routes: React.FC = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route path='/' exact component={Landing} />
        <Route path='/app' component={OrphanagesMap} />
        <Route path='/orphanages/create' component={CreateOrphanage} />
        <Route path='/orphanages/created' component={SuccessfulCreation} />
        <Route path='/orphanages/:id' component={Orphanage} />
        <Route path='/login' component={Login} />
        <Route path='/forgot-password' component={ForgotPassword} />
        <Route path='/reset-password' component={PasswordReset} />
        <Route path='/dashboard' isPrivate component={Dashboard} />
        <Route path='/pending' isPrivate component={Pending} />
      </Switch>
    </BrowserRouter>
  );
};

export default Routes;
