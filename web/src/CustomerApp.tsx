import React from "react";
import { RouteComponentProps } from "react-router";
import { Switch, Route, Redirect } from "react-router-dom";
import Auth, { CognitoUser } from "@aws-amplify/auth";

import CircularProgress from "@material-ui/core/CircularProgress";

import AppLayout from "./components/AppLayout";
import DashboardPage from "./pages/DashboardPage";
import ManageAccountPage from "./pages/ManageAccountPage";
import ManageUserProfile from "./pages/ManageUserProfile";
import CreateCustomerPage from "./pages/CreateCustomerPage";
import CustomerDetailPage from "./pages/CustomerDetailPage";
import CustomersPage from "./pages/CustomersPage";
import EmployeesPage from "./pages/EmployeesPage";
import JobsPage from "./pages/JobsPage";
import ErrorPage from "./pages/ErrorPage";

const App: React.FC<RouteComponentProps> = props => {
  const { history, location } = props;

  const [user, setUser] = React.useState<CognitoUser>();
  const [loading, setLoading] = React.useState(true);

  const validateUser = React.useCallback(async () => {
    setLoading(true);
    try {
      const currentUser: CognitoUser = await Auth.currentAuthenticatedUser();
      setUser(currentUser);
      setLoading(false);
      currentUser.getUserData(
        (error, userData) =>
          !error &&
          !!userData &&
          window.Rollbar.configure({
            payload: {
              person: {
                id: userData.Username,
                username: (
                  userData.UserAttributes.find(a => a.Name === "email") || {}
                ).Value,
                email: (
                  userData.UserAttributes.find(a => a.Name === "email") || {}
                ).Value
              }
            }
          })
      );
    } catch (e) {
      window.Rollbar.info(
        "A user tried to access private pages without being logged in",
        e
      );
      history.push("/login");
    }
  }, [history]);

  React.useEffect(() => {
    validateUser();
  }, [validateUser, location]);

  if (!user || loading) {
    return <CircularProgress />;
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
        <Redirect from="/app" exact to="/app/dashboard" />
        <Route component={ErrorPage} />
      </Switch>
    </AppLayout>
  );
};

export default App;
