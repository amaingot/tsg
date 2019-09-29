import * as React from 'react';

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';

import { makeStyles } from '../utils/Theme';
import CreateEmployeeDialog from './CreateEmployeeDialog';

const useStyles = makeStyles(theme => ({
  table: {
    minWidth: 700,
  },
  tableWrapper: {
    overflowX: 'auto',
  },
}));

interface EmployeeTableProps {
  rowsPerPage?: number;
  pageNumber?: number;
  tableFooter?: React.ReactNode;
}

const EmployeeTable: React.FC<EmployeeTableProps> = props => {
  const { tableFooter } = props;
  const classes = useStyles();

  return (
    <React.Fragment>
      <CreateEmployeeDialog submit={() => {}} loading={false} />
      <Table className={classes.table}>
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell>Email</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {/* {employee.map(
            e =>
              e && (
                <TableRow key={e.id}>
                  <TableCell component="th" scope="row">
                    {e.firstName} {e.lastName}
                  </TableCell>
                  <TableCell>{e.email}</TableCell>
                </TableRow>
              )
          )} */}
        </TableBody>
        {tableFooter}
      </Table>
    </React.Fragment>
  );
};

export default EmployeeTable;
