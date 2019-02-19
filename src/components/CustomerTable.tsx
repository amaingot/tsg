import * as React from 'react';

import Paper from '@material-ui/core/Paper';
import { StyleRulesCallback, withStyles, WithStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';

import CreateCustomer from 'src/components/CreateCustomer';
import withCustomers, { WithCustomersProps } from 'src/enhancers/withCustomers';

const styles: StyleRulesCallback = theme => ({
  root: {
    width: '100%',
    marginTop: theme.spacing.unit * 3,
    overflowX: 'auto',
  },
  table: {
    minWidth: 700,
  },
});

interface CustomerTableProps {
  limit?: number;
  offset?: number;
}

type AllProps = CustomerTableProps & WithCustomersProps & WithStyles;

const CustomerTable: React.FunctionComponent<AllProps> = props => {
  const { classes, listCustomersData: data, createCustomer } = props;

  const customers = data.listCustomers && data.listCustomers.items ? data.listCustomers.items : [];

  return (
    <>
      <CreateCustomer submit={createCustomer} loading={data.loading} />
      <Paper className={classes.root}>
        <Table className={classes.table}>
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
            {customers.map(
              c =>
                c && (
                  <TableRow key={c.id}>
                    <TableCell component="th" scope="row">
                      {c.firstName} {c.lastName}
                    </TableCell>
                    <TableCell>{c.cellPhone}</TableCell>
                    <TableCell>{c.homePhone}</TableCell>
                    <TableCell>{c.workPhone}</TableCell>
                    <TableCell>{c.lastUpdated}</TableCell>
                  </TableRow>
                )
            )}
          </TableBody>
        </Table>
      </Paper>
    </>
  );
};

const StyledCustomerTable = withStyles(styles)(CustomerTable);

export default withCustomers<CustomerTableProps>()(StyledCustomerTable);
