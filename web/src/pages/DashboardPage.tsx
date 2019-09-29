import * as React from 'react';
import { RouteComponentProps } from 'react-router';

import Typography from '@material-ui/core/Typography';

import PagePaper from '../components/PagePaper';

type Props = RouteComponentProps;

export default class DashboardPage extends React.Component<Props> {
  public render() {
    return (
      <>
        <Typography variant="h4">Dashboard</Typography>
        <PagePaper withPadding>
          <Typography>Here is where we will put company settings</Typography>
        </PagePaper>
      </>
    );
  }
}
