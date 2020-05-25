import React from "react";
import { useHistory, Switch, Route, Redirect } from "react-router-dom";
import { makeStyles, CircularProgress } from "@material-ui/core";

import Layout from "../components/Layout";
import { useAuth } from "../contexts/AuthContext";
import DashboardPage from "./DashboardPage";
import CustomersPage from "./CustomersPage";
import JobsPage from "./JobsPage";
import EmployeesPage from "./EmployeesPage";
import ReportsPage from "./ReportsPage";
import CreateCustomerPage from "./CreateCustomerPage";
import CustomerDetailPage from "./CustomerDetailPage";

const useStyles = makeStyles({
  container: {
    marginTop: 16,
  },
});
const AppPage: React.FC = () => {
  const classes = useStyles();
  const history = useHistory();
  const { loggedIn, loading } = useAuth();

  React.useEffect(() => {
    if (!loggedIn && !loading) {
      history.push("/login");
    }
  }, [loading, loggedIn, history]);

  if (loading) {
    return (
      <CircularProgress
        size={64}
        style={{ margin: "4rem auto", display: "block" }}
      />
    );
  }

  return (
    <Layout showDrawerNav>
      <div className={classes.container}>
        <Switch>
          <Route path="/app/dashboard" exact component={DashboardPage} />

          <Route path="/app/customers" exact component={CustomersPage} />
          <Route
            path="/app/customers/create"
            exact
            component={CreateCustomerPage}
          />
          <Route
            path="/app/customers/:customerId/detail"
            exact
            component={CustomerDetailPage}
          />

          <Route path="/app/jobs" exact component={JobsPage} />

          <Route path="/app/employees" exact component={EmployeesPage} />

          <Route path="/app/reports" exact component={ReportsPage} />
          <Redirect from="/" to="/app/dashboard" />
        </Switch>
      </div>
    </Layout>
  );
};

export default AppPage;
