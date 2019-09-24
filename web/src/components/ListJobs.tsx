import * as React from 'react';

import { StyleRulesCallback, withStyles, WithStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';

import CreateJobDialog from 'src/components/CreateJobDialog';
import withJobs, { WithJobsProps } from 'src/enhancers/withJobs';

const styles: StyleRulesCallback = theme => ({
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

type AllProps = ListJobsProps & WithJobsProps & WithStyles;

const ListJobs: React.FunctionComponent<AllProps> = props => {
  const { classes, listJobsData: data, createJob, tableFooter } = props;
  const jobs = data.listJobs && data.listJobs.items ? data.listJobs.items : [];

  return (
    <>
      <CreateJobDialog submit={createJob} loading={data.loading} />
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
          {jobs.map(
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
          )}
        </TableBody>
        {tableFooter}
      </Table>
    </>
  );
};

const StyledListJobs = withStyles(styles)(ListJobs);

export default withJobs<ListJobsProps>()(StyledListJobs);
