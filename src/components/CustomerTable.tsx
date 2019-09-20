import * as React from 'react';

import { StyleRules, withStyles, WithStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';

import CustomerModal from 'src/components/CreateJobDialog';
import withCustomers, { WithCustomersProps } from 'src/enhancers/withCustomers';
import { goTo } from 'src/utils/history';

const styles: StyleRules = {
  table: {
    minWidth: 700,
  },
  tableWrapper: {
    overflowX: 'auto',
  },
};

interface CustomerTableProps {
  rowsPerPage?: number;
  pageNumber?: number;
  tableFooter?: React.ReactNode;
}

type AllProps = CustomerTableProps & WithCustomersProps & WithStyles<typeof styles>;

const CustomerTable: React.FunctionComponent<AllProps> = props => {
  const { classes, listCustomersData: data, createCustomer, tableFooter } = props;
  const customers = data.listCustomers && data.listCustomers.items ? data.listCustomers.items : [];

  return (
    <>
      <CustomerModal submit={createCustomer} loading={data.loading} />
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
                <TableRow key={c.id} hover onClick={() => goTo(`/app/customer/${c.id}`)}>
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
        {tableFooter}
      </Table>
    </>
  );
};

const StyledCustomerTable = withStyles(styles)(CustomerTable);

export default withCustomers<CustomerTableProps>()(StyledCustomerTable);
