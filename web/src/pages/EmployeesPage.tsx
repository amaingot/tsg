import React from "react";
import { RouteComponentProps } from "react-router";
import { NavLink } from "react-router-dom";
import { ListEmployeesResponse, Employee } from "tsg-shared";
import moment from "moment";

import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import Fab from "@material-ui/core/Fab";
import AddIcon from "@material-ui/icons/Add";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";

import axios from "../utils/axios";

const useStyles = makeStyles(theme => ({
  addButton: {
    position: "absolute",
    right: 0
  },
  title: {
    position: "relative"
  }
}));

const EmployeesPage: React.FC<RouteComponentProps> = props => {
  const classes = useStyles();
  const { history } = props;
  const [employees, setEmployees] = React.useState<Array<Employee>>();

  React.useEffect(() => {
    axios.get<ListEmployeesResponse>("/employees/list").then(resp => {
      if (resp.status === 200) {
        setEmployees(resp.data.data);
      }
    });
  }, []);

  return (
    <React.Fragment>
      <Typography variant="h4" gutterBottom className={classes.title}>
        Employees
        <Fab
          color="primary"
          aria-label="add"
          className={classes.addButton}
          component={NavLink}
          to="/app/employees/create"
        >
          <AddIcon />
        </Fab>
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Paper>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Name</TableCell>
                  <TableCell>Email</TableCell>
                  <TableCell>Cell Phone</TableCell>
                  <TableCell>Role</TableCell>
                  <TableCell>Updated On</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {employees &&
                  employees.map(e => (
                    <TableRow
                      key={e.id}
                      onClick={() => history.push(`/app/employees/${e.id}`)}
                      hover
                    >
                      <TableCell component="th" scope="row">
                        {e.firstName} {e.lastName}
                      </TableCell>
                      <TableCell>{e.email}</TableCell>
                      <TableCell>{e.cellPhone}</TableCell>
                      <TableCell>{e.userRole}</TableCell>
                      <TableCell>
                        {moment(e.updatedAt).format("MMM d, YY")}
                      </TableCell>
                    </TableRow>
                  ))}
              </TableBody>
            </Table>
          </Paper>
        </Grid>
      </Grid>
    </React.Fragment>
  );
};

export default EmployeesPage;
