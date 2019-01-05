import * as React from 'react';
import { connect } from 'react-redux';

import { login } from 'store/auth/actions';
import { LoginRequest } from 'store/auth/types';
import { ApplicationState } from 'store/index';

export interface Props {
  loggedIn: boolean;
  login: (loginRequest: LoginRequest) => void;
}

class TestPage extends React.Component<Props> {
  public render() {
    return (
      <div>
        LoggedIn: {this.props.loggedIn}
        <br />
        <a onClick={() => this.props.login({ email: '', password: '', stayLoggedIn: false })}>
          Log In
        </a>
      </div>
    );
  }
}

const mapState2Props = (state: ApplicationState) => {
  return {
    loggedIn: !!state.auth.user,
  };
};

const mapAction2Props = {
  login,
};

export default connect(
  mapState2Props,
  mapAction2Props
)(TestPage);