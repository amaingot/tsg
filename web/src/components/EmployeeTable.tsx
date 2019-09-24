import * as React from 'react';

import { StyleRulesCallback, withStyles, WithStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';

import CreateEmployeeDialog from 'src/components/CreateEmployeeDialog';
import withEmployees, { WithEmployeesProps } from 'src/enhancers/withEmployees';

const styles: StyleRulesCallback = theme => ({
  table: {
    minWidth: 700,
  },
  tableWrapper: {
    overflowX: 'auto',
  },
});

interface EmployeeTableProps {
  rowsPerPage?: number;
  pageNumber?: number;
  tableFooter?: React.ReactNode;
}

type AllProps = EmployeeTableProps & WithEmployeesProps & WithStyles;

const EmployeeTable: React.FunctionComponent<AllProps> = props => {
  const { classes, listEmployeesData: data, createEmployee, tableFooter } = props;
  const employee = data.listEmployees && data.listEmployees.items ? data.listEmployees.items : [];

  return (
    <>
      <CreateEmployeeDialog submit={createEmployee} loading={data.loading} />
      <Table className={classes.table}>
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell>Email</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {employee.map(
            e =>
              e && (
                <TableRow key={e.id}>
                  <TableCell component="th" scope="row">
                    {e.firstName} {e.lastName}
                  </TableCell>
                  <TableCell>{e.email}</TableCell>
                </TableRow>
              )
          )}
        </TableBody>
        {tableFooter}
      </Table>
    </>
  );
};

const StyledEmployeeTable = withStyles(styles)(EmployeeTable);

export default withEmployees<EmployeeTableProps>()(StyledEmployeeTable);
