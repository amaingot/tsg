import * as React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router';
import { Dispatch } from 'redux';
import styled from 'styled-components';

import LoginForm from 'components/LoginForm';
import frontLogo from 'static/largeColorLogo.png';
import { login } from 'store/auth/actions';
import { AuthState, LoginRequest } from 'store/auth/types';
import { ApplicationState } from 'store/index';

const LoginContainer = styled.div`
  width: 300px;
  height: 300px;
  position: absolute;
  margin: auto;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
`;

const BigImage = styled.img`
  width: 100%;
  margin-bottom: 20px;
`;

interface LoginPageProps {
  auth: AuthState;
  login: (payload: LoginRequest) => any;
}

class LoginPage extends React.Component<LoginPageProps> {
  public renderAuthed = () => (
    <Redirect
      to={{
        pathname: '/',
        search: App.webEnv === 'production' ? '' : `?env=${App.webEnv}`,
      }}
    />
  );

  public renderLogin = () => (
    <div>
      <LoginContainer>
        <BigImage src={frontLogo} />
        <LoginForm onSubmit={this.props.login} />
      </LoginContainer>
    </div>
  );

  public render() {
    if (this.props.auth.jwt) {
      return this.renderAuthed();
    } else {
      return this.renderLogin();
    }
  }
}

const mapState2Props = (state: ApplicationState) => {
  return {
    auth: state.auth,
  };
};

const mapDispatch2Props = (dispatch: Dispatch) => {
  return {
    login: (payload: LoginRequest) => dispatch(login(payload)),
  };
};

export default connect(
  mapState2Props,
  mapDispatch2Props
)(LoginPage);
