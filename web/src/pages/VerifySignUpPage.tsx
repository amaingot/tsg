import * as React from 'react';
import { RouteComponentProps } from 'react-router';

import Fingerprint from '@material-ui/icons/Fingerprint';

import AuthCodeForm from 'src/components/AuthCodeForm';
import { withAuth, WithAuthProps } from 'src/enhancers/withAuth';
import SimpleLayout from 'src/layouts/SimpleLayout';

type Props = WithAuthProps & RouteComponentProps;

class VerifySignUpPage extends React.Component<Props> {
  public componentDidMount() {
    const { auth } = this.props;
    if (!auth.resendCodeForNewUser || !auth.verifyCodeForyNewUser) {
      auth.redirect('/');
    }
  }

  public render() {
    const { auth } = this.props;

    return (
      <SimpleLayout>
        <AuthCodeForm
          title="Verify Account"
          resendCode={auth.resendCodeForNewUser}
          submit={auth.verifyCodeForyNewUser}
          loading={!!auth.loading}
          serverError={auth.errorMessage}
          icon={Fingerprint}
        />
      </SimpleLayout>
    );
  }
}

export default withAuth<RouteComponentProps>(VerifySignUpPage);
