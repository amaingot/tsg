import * as React from 'react';
import { RouteComponentProps } from 'react-router';

import Typography from '@material-ui/core/Typography';

import EmployeeTable from 'src/components/EmployeeTable';
import PagePaper from 'src/components/PagePaper';


type Props = RouteComponentProps;

interface State {
  rowsPerPage: number;
  pageNumber: number;
}

export default class EmployeesPage extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = {
      rowsPerPage: 50,
      pageNumber: 1,
    };
  }

  public render() {
    return (
      <>
        <Typography variant="h4">Employees</Typography>
        <PagePaper>
          <EmployeeTable />
        </PagePaper>
      </>
    );
  }
}
