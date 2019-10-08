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

const App: React.FC<RouteComponentProps> = props => {
  const { location, history } = props;

  const [user, setUser] = React.useState<CognitoUser>();
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    setLoading(true);
    Auth.currentAuthenticatedUser()
      .then(user => {
        setUser(user);
        setLoading(false);
        if (user instanceof CognitoUser) {
          user.getUserData(
            (error, userData) =>
              !error &&
              !!userData &&
              window.Rollbar.configure({
                payload: {
                  person: {
                    id: userData.Username,
                    username: (
                      userData.UserAttributes.find(a => a.Name === "email") ||
                      {}
                    ).Value,
                    email: (
                      userData.UserAttributes.find(a => a.Name === "email") ||
                      {}
                    ).Value
                  }
                }
              })
          );
        }
      })
      .catch(e => {
        window.Rollbar.error(
          "Unknown auth error when validating if a customer is logged in",
          e
        );
        history.push("/");
      });
  }, [location, history]);

  if (!user && loading) {
    return <CircularProgress />;
  }

  return (
    <AppLayout>
      <Switch>
        <Route path="/app/dashboard" component={DashboardPage} />
        <Route path="/app/settings/account" component={ManageAccountPage} />
        <Route path="/app/settings/user" component={ManageUserProfile} />
        <Route path="/app/customers/create" component={CreateCustomerPage} />
        <Route path="/app/customers/:id" component={CustomerDetailPage} />
        <Route path="/app/customers" exact component={CustomersPage} />
        <Route path="/app/employees" component={EmployeesPage} />
        <Route path="/app/jobs" component={JobsPage} />
        <Redirect from="/app" to="/app/dashboard" />
      </Switch>
    </AppLayout>
  );
};

export default App;
