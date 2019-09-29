import * as React from 'react';

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';

import CreateJobDialog from '../components/CreateJobDialog';
import { makeStyles } from '../utils/Theme';

const useStyles = makeStyles({
  table: {
    minWidth: 700,
  },
  tableWrapper: {
    overflowX: 'auto',
  },
});

interface ListJobsProps {
  rowsPerPage?: number;
  pageNumber?: number;
  tableFooter?: React.ReactNode;
}

const ListJobs: React.FC<ListJobsProps> = props => {
  const { tableFooter } = props;
  const classes = useStyles();

  // const jobs = data.listJobs && data.listJobs.items ? data.listJobs.items : [];

  return (
    <React.Fragment>
      <CreateJobDialog submit={() => { }} loading={false} />
      <Table className={classes.table}>
        <TableHead>
          <TableRow>
            <TableCell>Customer Name</TableCell>
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
                  <TableCell component="th" scope="row">
                    {j.customer && `${j.customer.firstName} ${j.customer.lastName}`}
                  </TableCell>
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
    </React.Fragment>
  );
};

export default ListJobs;
