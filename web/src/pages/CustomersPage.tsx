import React from "react";
import { RouteComponentProps } from "react-router";
import { NavLink } from "react-router-dom";
import { ListCustomersResponse, Customer } from "tsg-shared";
import moment from "moment";

import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import Fab from "@material-ui/core/Fab";
import Tooltip from "@material-ui/core/Tooltip";
import AddIcon from "@material-ui/icons/Add";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";

import axios from "../utils/axios";
import LoadingSpinner from "../components/LoadingSpinner";

const useStyles = makeStyles({
  addButton: {
    position: "absolute",
    right: 0
  },
  title: {
    position: "relative"
  },
  paper: {
    minHeight: "40vh",
    display: "flex"
  }
});

const CustomersPage: React.FC<RouteComponentProps> = props => {
  const classes = useStyles();
  const { history } = props;
  const [customers, setCustomers] = React.useState<Array<Customer>>();

  React.useEffect(() => {
    axios.get<ListCustomersResponse>("/customers/list").then(resp => {
      if (resp.status === 200) {
        setCustomers(resp.data.data);
      }
    });
  }, []);

  return (
    <React.Fragment>
      <Typography variant="h4" gutterBottom className={classes.title}>
        Customers
        <Tooltip title="Add New Customer">
          <Fab
            color="primary"
            aria-label="add"
            className={classes.addButton}
            component={NavLink}
            to="/app/customers/create"
          >
            <AddIcon />
          </Fab>
        </Tooltip>
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Paper className={classes.paper}>
            {!customers ? (
              <LoadingSpinner />
            ) : (
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Name</TableCell>
                    <TableCell>Cell Phone</TableCell>
                    <TableCell>Home phone</TableCell>
                    <TableCell>Work Phone</TableCell>
                    <TableCell>Last Updated</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {customers &&
                    customers.map(c => (
                      <TableRow
                        key={c.id}
                        onClick={() => history.push(`/app/customers/${c.id}`)}
                        hover
                      >
                        <TableCell component="th" scope="row">
                          {c.firstName} {c.lastName}
                        </TableCell>
                        <TableCell>{c.cellPhone}</TableCell>
                        <TableCell>{c.homePhone}</TableCell>
                        <TableCell>{c.workPhone}</TableCell>
                        <TableCell>
                          {moment(c.updatedAt).format("MMM d, YY")}
                        </TableCell>
                      </TableRow>
                    ))}
                </TableBody>
              </Table>
            )}
          </Paper>
        </Grid>
      </Grid>
    </React.Fragment>
  );
};

export default CustomersPage;
