import React from 'react';
import { RouteComponentProps } from 'react-router';

import { Switch, Route, Redirect } from 'react-router-dom';

import AppLayout from './components/AppLayout';

import DashboardPage from './pages/DashboardPage';
import CustomersPage from './pages/CustomersPage';
import EmployeesPage from './pages/EmployeesPage';
import JobsPage from './pages/JobsPage';

const App: React.FC<RouteComponentProps> = () => {
  return (
    <AppLayout>
      <Switch>
        <Route path="/app/dashboard" component={DashboardPage} />
        <Route path="/app/customers" component={CustomersPage} />
        <Route path="/app/employees" component={EmployeesPage} />
        <Route path="/app/jobs" component={JobsPage} />
        <Redirect from="/app" to="/app/dashboard" />
      </Switch>
    </AppLayout>
  );
}

export default App;
