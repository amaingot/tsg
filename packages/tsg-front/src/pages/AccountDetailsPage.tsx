import * as React from 'react';
import { connect } from 'react-redux';

import { AuthState } from 'store/auth/types';
import { ReduxShape } from 'store/index';

export interface AccountDetailsPageProps {
  auth: AuthState;
}

class AccountDetailsPage extends React.Component<AccountDetailsPageProps, any> {
  public render() {
    const { auth } = this.props;
    return (
      <div>
        <div>{JSON.stringify(auth)}</div>
      </div>
    );
  }
}

const mapState2Props = (state: ReduxShape) => {
  return {
    auth: state.auth,
  };
};

export default connect(mapState2Props)(AccountDetailsPage);
