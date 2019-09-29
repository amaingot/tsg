import * as React from 'react';

import { makeStyles } from '../utils/Theme';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';

const useStyles = makeStyles(theme => ({
  table: {
    minWidth: 700,
  },
  tableWrapper: {
    overflowX: 'auto',
  },
}));

interface CustomerTableProps {
  rowsPerPage?: number;
  pageNumber?: number;
  tableFooter?: React.ReactNode;
  jobs: any[];
}

const CustomerTable: React.FC<CustomerTableProps> = props => {
  const { tableFooter } = props;
  const classes = useStyles();

  return (
    <>
      <Table className={classes.table}>
        <TableHead>
          <TableRow>
            <TableCell>Racket</TableCell>
            <TableCell>String</TableCell>
            <TableCell>Guage</TableCell>
            <TableCell>Tension</TableCell>
            <TableCell>Recieved</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {/* {jobs.map(
            j =>
              j && (
                <TableRow key={j.id}>
                  <TableCell>{j.racket}</TableCell>
                  <TableCell>{j.stringName}</TableCell>
                  <TableCell>{j.gauge}</TableCell>
                  <TableCell>{j.tension}</TableCell>
                  <TableCell>{j.createdAt}</TableCell>
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
