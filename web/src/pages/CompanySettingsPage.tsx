import * as React from 'react';
import { RouteComponentProps } from 'react-router';

import Typography from '@material-ui/core/Typography';

import PagePaper from '../components/PagePaper';

type Props = RouteComponentProps;

export default class CompanySettingsPage extends React.Component<Props, {}> {
  constructor(props: Props) {
    super(props);
  }

  public render() {
    return (
      <>
        <Typography variant="h4">Company Settings</Typography>
        <PagePaper withPadding>
          <Typography>Here is where we will put company settings</Typography>
        </PagePaper>
      </>
    );
  }
}
