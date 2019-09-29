import * as React from 'react';

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';

import CustomerModal from '../components/CreateJobDialog';
import { makeStyles } from '../utils/Theme';
// import { goTo } from '../utils/history';

const useStyles = makeStyles({
  table: {
    minWidth: 700,
  },
  tableWrapper: {
    overflowX: 'auto',
  },
});

interface CustomerTableProps {
  rowsPerPage?: number;
  pageNumber?: number;
  tableFooter?: React.ReactNode;
}

const CustomerTable: React.FC<CustomerTableProps> = props => {
  const { tableFooter } = props;
  const classes = useStyles();

  // const customers = data.listCustomers && data.listCustomers.items ? data.listCustomers.items : [];

  return (
    <>
      <CustomerModal submit={() => { }} loading={false} />
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
          {/* {customers.map(
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
          )} */}
        </TableBody>
        {tableFooter}
      </Table>
    </>
  );
};

export default CustomerTable;
