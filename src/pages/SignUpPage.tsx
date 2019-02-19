import * as React from 'react';

import Typography from '@material-ui/core/Typography';
import PersonIcon from '@material-ui/icons/Person';

import HeaderIcon from 'src/components/HeaderIcon';
import SignUpFrom from 'src/components/SignUpFrom';
import { withAuth, WithAuthProps } from 'src/enhancers/withAuth';
import SimpleLayout from 'src/layouts/SimpleLayout';

class SignUpPage extends React.Component<WithAuthProps> {
  public render() {
    const { auth } = this.props;
    const loading = !!auth.loading;

    return (
      <SimpleLayout>
        <HeaderIcon loading={loading} icon={PersonIcon} />
        <Typography component="h1" variant="h5">
          Sign Up
        </Typography>
        <SignUpFrom loading={loading} submit={auth.signUp} error={auth.errorMessage} />
      </SimpleLayout>
    );
  }
}

export default withAuth(SignUpPage);
