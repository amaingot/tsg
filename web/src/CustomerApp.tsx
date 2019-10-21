import React from "react";
import { RouteComponentProps } from "react-router";
import { Switch, Route, Redirect } from "react-router-dom";

import DashboardPage from "./pages/DashboardPage";
import ManageAccountPage from "./pages/ManageAccountPage";
import ManageUserProfile from "./pages/ManageUserProfile";
import CreateCustomerPage from "./pages/CreateCustomerPage";
import CustomerDetailPage from "./pages/CustomerDetailPage";
import CustomersPage from "./pages/CustomersPage";
import EmployeesPage from "./pages/EmployeesPage";
import JobsPage from "./pages/JobsPage";
import ErrorPage from "./pages/ErrorPage";
import SupportPage from "./pages/SupportPage";

import { useUserData } from "./contexts/UserDataContext";
import AppLayout from "./components/AppLayout";
import LoadingSpinner from "./components/LoadingSpinner";

const App: React.FC<RouteComponentProps> = () => {
  const { loading, user } = useUserData();

  if (!user || loading) {
    return <LoadingSpinner fullPage />;
  }

  return (
    <AppLayout>
      <Switch>
        <Route path="/app/dashboard" exact component={DashboardPage} />
        <Route
          path="/app/settings/account"
          exact
          component={ManageAccountPage}
        />
        <Route path="/app/settings/user" exact component={ManageUserProfile} />
        <Route
          path="/app/customers/create"
          exact
          component={CreateCustomerPage}
        />
        <Route path="/app/customers/:id" exact component={CustomerDetailPage} />
        <Route path="/app/customers" exact component={CustomersPage} />
        <Route path="/app/employees" exact component={EmployeesPage} />
        <Route path="/app/jobs" exact component={JobsPage} />
        <Route path="/app/support" exact component={SupportPage} />
        <Redirect from="/app" exact to="/app/dashboard" />
        <Route component={ErrorPage} />
      </Switch>
    </AppLayout>
  );
};

export default App;
