import React from "react";
import { RouteComponentProps } from "react-router";
import { NavLink } from "react-router-dom";
import { ListCustomersResponse, Customer } from "tsg-shared";
import moment from "moment";

import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Fab from "@material-ui/core/Fab";
import Tooltip from "@material-ui/core/Tooltip";
import AddIcon from "@material-ui/icons/Add";

import Table, { Column } from "../components/Table";

import axios from "../utils/axios";

const useStyles = makeStyles({
  addButton: {
    position: "absolute",
    right: 0
  },
  title: {
    position: "relative"
  }
});

const CustomersPage: React.FC<RouteComponentProps> = props => {
  const classes = useStyles();
  const { history } = props;
  const [customers, setCustomers] = React.useState<Array<Customer>>([]);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    axios.get<ListCustomersResponse>("/customers/list").then(resp => {
      if (resp.status === 200) {
        setCustomers(resp.data.data);
        setLoading(false);
      }
    });
  }, []);

  const columns: Column<Customer>[] = [
    { title: "First Name", field: "firstName" },
    { title: "Last Name", field: "lastName" },
    { title: "Cell Phone", field: "cellPhone" },
    { title: "Home Phone", field: "homePhone" },
    { title: "Work Phone", field: "workPhone" },
    { title: "Email", field: "email" },
    {
      title: "Last Updated",
      field: "updatedAt",
      render: c => moment(c.updatedAt).format("MMM dd, YY"),
      defaultSort: "desc"
    }
  ];

  const handleRowClick = (
    _event?: React.MouseEvent<Element, MouseEvent> | undefined,
    rowData?: Customer | undefined
  ) => {
    if (typeof rowData !== "undefined") {
      history.push(`/app/customers/${rowData.id}`);
    }
  };

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
          <Table
            columns={columns}
            data={customers}
            isLoading={loading}
            onRowClick={handleRowClick}
          />
        </Grid>
      </Grid>
    </React.Fragment>
  );
};

export default CustomersPage;
